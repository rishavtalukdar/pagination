import React from "react";
import { useState,useEffect } from "react";
import styles from './pagination.module.css'

export default function Pagination (){

    const[Data,setData] =useState([])
    const [currentRecord, setCurrentRecord] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const maxRecords = 10;
    const [totalPages, setTotalPages] = useState(0)
    const API_URL = "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    
    useEffect(()=>{
        const fetchData = async () => {
            try {
              const response = await fetch(API_URL);
              if (!response.ok) {
                throw new Error("Failed to fetch data");
              }
              const jsonData = await response.json();
              setData(jsonData);
            } catch (error) {
              alert("Failed to fetch data");
              console.error(error);
            }
          };
        fetchData()
        
    },[])


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
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>

                    </thead>
                    <tbody>
                    {currentRecord.map((employee)=>(
                        <tr>
                            <td>{employee.id}</td>
                            <td>{employee.name}</td>
                            <td>{employee.email}</td>
                            <td>{employee.role}</td>
                        </tr>
                    ))}
                     </tbody>
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