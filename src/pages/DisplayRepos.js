import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DisplayRepos.css';

const DisplayRepos = () => {
    // API host
    const host = 'http://localhost:8080';

    // State variables
    const [repos, setRepos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [reposPerPage, setReposPerPage] = useState(10);

    // Fetch repositories on component mount or when page/repo count changes
    useEffect(() => {
        fetchRepositories();
    }, [currentPage, reposPerPage]);

    // Fetch repositories from the API
    const fetchRepositories = async () => {
        try {
            const response = await axios.get(`${host}/get-all-repos`);
            setRepos(response.data);
        } catch (error) {
            console.error('Error fetching repositories:', error);
        }
    };

    // Handle dropdown change
    const handleChange = (e) => {
        setCurrentPage(1);
        setReposPerPage(Number(e.target.value));
    };

    // Calculate current repos to display
    const indexOfLastRepo = currentPage * reposPerPage;
    const indexOfFirstRepo = indexOfLastRepo - reposPerPage;
    const currentRepos = repos.slice(indexOfFirstRepo, indexOfLastRepo);

    return (
        <div>
           
            <h1 className="assignment-heading">Backend Application Case Study Project</h1>

            {/* Dropdown for selecting repos per page */}
            <div className="dropdown-container">
                <label htmlFor="reposPerPage">Repos Per Page:</label>
                <select
                    id="reposPerPage"
                    className="dropdown-select"
                    onChange={handleChange}
                    value={reposPerPage}
                >
                    <option value="10">10</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
            </div>

            {/* Container for displaying repositories */}
            <div className="repo-container">
                {currentRepos.map((repo) => (
                    <div key={repo.id} className="repo-box">
                        <h1 className="repo-title">{repo.name}</h1>
                        <p className="repo-description">{repo.description}</p>
                        <p className="repo-stars">
                            ⭐ Stars: 
                            <span className="star-count">{repo.stargazers_count}</span>
                        </p>
                        
                    </div>
                ))}
            </div>

            {/* Pagination buttons */}
            <div className="pagination">
                {Array.from({ length: Math.ceil(repos.length / reposPerPage) }).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            setCurrentPage(index + 1);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className={index + 1 === currentPage ? 'current-page' : 'other-page'}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default DisplayRepos;
