import React from "react";
import { useState,useEffect } from "react";
import styles from './pagination.module.css'

export default function Pagination (){

    const[Data,setData] =useState([])
    const [error, setError] = useState(null);
    const [currentRecord, setCurrentRecord] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const maxRecords = 10;
    const [totalPages, setTotalPages] = useState(0)
    const API_URL = "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    
    useEffect(()=>{
        const fetchData = async()=>{
            try {
                let response = await fetch(API_URL)
                if (!response.ok) {
                    throw new Error("Failed to fetch countries");
                }
                let details = await response.json();
                setData(details)
            }catch(e){
                setError(error.message);
                console.error(error);
            }
 
        }
        fetchData()
        
    },[])
 console.log("Data",Data)
    useEffect(() => {

        const startIndex = (currentPage - 1) * maxRecords
        const endIndex = Math.min(currentPage * maxRecords, Data.length)

        setCurrentRecord([...Data].slice(startIndex, endIndex))
        setTotalPages(Math.ceil(Data.length / maxRecords))

    }, [currentPage, Data])

    // update page if all items on current page have been deleted
    useEffect(() => {

        if(totalPages < currentPage && currentPage > 1){
            setCurrentPage(prev => prev - 1)
        }

    }, [totalPages])

    const handlePrev = () => {
        if(currentPage > 1){
            setCurrentPage(prev => prev - 1)
        }
    }

    const handleNext = () => {
        if(totalPages != currentPage){
            setCurrentPage(prev => prev + 1)
        }
    }

    return (
        <>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <h1>Employee Data Table</h1>
            </div>
            <div>
                <table>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                    {currentRecord.map((employee)=>(
                        <tr>
                            <td>{employee.id}</td>
                            <td>{employee.name}</td>
                            <td>{employee.email}</td>
                            <td>{employee.role}</td>
                        </tr>
                    ))}
                </table>
            </div>
            <div className={styles.paginationWrapper}>
            <button onClick={handlePrev} disabled={currentPage === 1}>
                Previous 
            </button>

            <p>{currentPage}</p>

            <button onClick={handleNext} disabled={totalPages === currentPage}>
                Next
            </button>
        </div>
        </>
    )
}