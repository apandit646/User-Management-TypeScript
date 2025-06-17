import React, { useCallback, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

const ViewProject = () => {
  const [projectTeams, setProjectTeams] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const ITEMS_PER_PAGE = 5;

  const pageCount = Math.ceil(totalCount / ITEMS_PER_PAGE);

  const handlePageClick = useCallback(({ selected }) => {
    setCurrentPage(selected);
  }, []);

  const fetchProjectTeams = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/project/getAll?offset=${
          currentPage * ITEMS_PER_PAGE
        }&limit=${ITEMS_PER_PAGE}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response);

      const data = await response.json();
      console.log("😊😊😂😂🤦‍♀️😊😂😂😂😂😂🤦‍♀️🤦‍♀️", data);
      if (response.status !== 200) {
        throw new Error(data.error || "Failed to fetch project teams.");
      }

      if (!Array.isArray(data.projectTeam)) {
        throw new Error("Unexpected response format.");
      }

      setProjectTeams(data.projectTeam);

      setTotalCount(data.count);
    } catch (error) {
      console.error("Error fetching project teams:", error.message);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchProjectTeams();
  }, [fetchProjectTeams]);

  const deleteProjectTeam = useCallback(async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/projectTeam/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete entry.");
      }

      setProjectTeams((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting entry:", error.message);
    }
  }, []);

  return (
    <div className="p-4">
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="w-full text-sm text-left text-gray-700 dark:text-gray-300">
          <thead className="text-xs text-white uppercase bg-blue-600 sticky top-0">
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Project ID</th>
              <th className="px-6 py-3">User ID</th>
              <th className="px-6 py-3">Role</th>
              <th className="px-6 py-3">Manager ID</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projectTeams.map((item) => (
              <tr
                key={item.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                <td className="px-6 py-4">{item.id}</td>
                <td className="px-6 py-4">{item.projectId}</td>
                <td className="px-6 py-4">{item.userId}</td>
                <td className="px-6 py-4 capitalize">{item.role}</td>
                <td className="px-6 py-4">{item.managerId ?? "—"}</td>
                <td className="px-6 py-4 capitalize">{item.status}</td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => deleteProjectTeam(item.id)}
                    className="px-3 py-1 text-xs font-medium bg-red-500 text-white rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <ReactPaginate
          previousLabel={"«"}
          nextLabel={"»"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={1}
          pageRangeDisplayed={2}
          onPageChange={handlePageClick}
          containerClassName={"inline-flex items-center space-x-2 text-sm"}
          pageClassName={
            "px-3 py-2 leading-tight bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-white"
          }
          activeClassName={"text-white bg-blue-600 border-blue-600"}
          previousClassName={
            "px-3 py-2 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100"
          }
          nextClassName={
            "px-3 py-2 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100"
          }
          disabledClassName={"opacity-50 cursor-not-allowed"}
        />
      </div>
    </div>
  );
};

export default ViewProject;
