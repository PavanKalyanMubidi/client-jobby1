import { useEffect, useState } from "react";
import { Audio } from 'react-loader-spinner';
import Cookies from "js-cookie";
import { BsSearch } from 'react-icons/bs';
import JobCard from "../JobCard";
import JobFilterGroup  from "../JobFilterGroup";
import './index.css';

const employementTypesList = [
    {
        label: "Full Time",
        employementTypeId: "FULL TIME",
    },
    {
        label: "Part Time",
        employementTypeId: "PART TIME",
    },
    {
        label: "Freelance",
        employementTypeId: "FREELANCE",
    },
    {
        label: "Internship",
        employementTypeId: "INTERNSHIP",
    }
]

const salaryRangeList = [
    {
        salaryRangeId: "1000000",
        label: "10 LPA And Above"
    },
    {
        salaryRangeId: "2000000",
        label: "20 LPA And Above"
    },
    {
        salaryRangeId: "3000000",
        label: "30 LPA And Above"
    },
    {
        salaryRangeId: "4000000",
        label: "40 LPA And Above"
    },
]

const apiStatusConstants = {
    initial: "INITIAL",
    inProgress: "INPROGRESS",
    success: "SUCCESS",
    failure: "FAILURE"
}

const JobProfileSection = () => {
    const [jobs, setJobs] = useState([])
    const [searchInput, setSearchInput] = useState("")
    const [employementType, setEmployementType] = useState([])
    const [salaryRange, setSalaryRange] = useState(0);
    const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);

    useEffect(() => {
        getJobs()
    }, [employementType,salaryRange]);

    const getJobs = async () => {
        setApiStatus(apiStatusConstants.inProgress)
        const token = Cookies.get('jwt-token')
       // console.log('token', token)
        const url = `http://localhost:4446/api/filterjobs?employement_type=${employementType.join()}&minimum_package=${salaryRange}&search=${searchInput}`
        const options = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const response = await fetch(url, options)
            // console.log(response);
            if (response.ok === true) {
                const data = await response.json();
                setJobs(data)
                setApiStatus(apiStatusConstants.success)
            }
            else {
                setApiStatus(apiStatusConstants.failure)
            }
        }
        catch (e) {
            console.log(e);
            setApiStatus(apiStatusConstants.failure)
        }
    }

    const onChangeSearchInput = (e) => {
        setSearchInput(e.target.value)
    };

    const onChangeSalary = (salary) => {
        setSalaryRange(salary);
    }

    const onChangeEmployemetType = (typeId) =>{
        if(employementType.includes(typeId)) {
            setEmployementType(employementType.filter((eachType)=> eachType !== typeId));
        }
        else{
            setEmployementType([...employementType, typeId]);
        }
    };

    const onKeyDown = (e) => {
        if (e.key === 'Enter') {
            getJobs();
        }
    }

    const renderJobDetails = () => {
        const jobDisplay = jobs.length > 0;
        return jobDisplay ? (
            <div className="details-container">
                <div className="search-input">
                    <input
                        type="search"
                        className="search"
                        onChange={onChangeSearchInput}
                        onKeyDown={onKeyDown}
                        value={searchInput} />
                    <button type="button" className="search-button" onClick={getJobs}>
                        <BsSearch className="search-icon" />
                    </button>
                </div>
                <ul className="job-details-item-container">
                    {jobs.map((eachJob) => (
                        <JobCard
                            jobDetails={eachJob}
                            key={eachJob._id} />
                    ))}
                </ul>
            </div>
        ) :
            (
                <div className="no-jobs-container">
                    <div className="search-input">
                        <input
                            type="search"
                            className="search"
                            placeholder="search"
                            onChange={onChangeSearchInput}
                            onKeyDown={onKeyDown}
                            value={searchInput} />
                        <button type="button" className="search-button" onClick={getJobs}>
                            <BsSearch className="search-icon" />
                        </button>
                    </div>
                    <img src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png" className="no-jobs" alt="no jobs" />
                    <h1 className="no-jobs-heading">NO Jobs Found</h1>
                    <p className="no-jobs-desc">We Couldnt found any jobs Tryother filters</p>
                </div>
            )
    }

    const renderFailureView = () => (
        <div>
            <img src="https://assets.ccbp.in/frontend/react-js/failure-img.png "
            alt="failure View" className="failure-view"/>
            <h1 className="failure-heading">OOPs Something Went Wrong</h1>
            <p className="failure-desc">we cannot find the page you are looking for.</p>
            <button type="button" className="jobs-failure-button" onClick={getJobs}>Retry</button>
        </div>
    );

    const renderLoaderView = () => (
        <div className="profile-loader-container">
            <Audio 
            height="50"
            width="50"
            color="#ffffff"
            type="ThreeDots" />
        </div>
    );

    const renderJobProfileSection = () =>{
        switch(apiStatus){
            case apiStatusConstants.success: return renderJobDetails();
            case apiStatusConstants.failure: return renderFailureView();
            case apiStatusConstants.inProgress: return renderLoaderView();
            default : return null;
        }
    }

    return (
        <div className="job-details-container">
            <div className="render-group-items">
                <JobFilterGroup
                employementTypesList={employementTypesList}
                salaryRangeList={salaryRangeList}
                changeEmployemetType={onChangeEmployemetType}
                changeSalary={onChangeSalary}
                searchInput={searchInput}
                getJobs={getJobs}/>
            </div>
            <div className="responsive-items">
              {renderJobProfileSection()}  
            </div>
        </div>
    )
}

export default JobProfileSection;