import { useCallback, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

const ViewProject = () => {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [addmemberpop, setaddmemberpop] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [projectId, setProjectId] = useState(null);
  const ITEMS_PER_PAGE = 5;

  // const editProject = useCallback(async (projectId) => {
  //   console.log("Editing project with ID:", projectId);
  //   if (!projectId) {
  //     alert("Project ID is required to edit a project.");
  //     return;
  //   }
  //   const url = `http://localhost:3000/api/project/editProject/${projectId}`;
  //   const response = await fetch(url, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${localStorage.getItem("token")}`,
  //     },
  //   });
  //   if (!response.ok) {
  //     alert("Failed to fetch project details.");
  //     return;
  //   }
  //   const projectData = await response.json();
  //   console.log("Project data fetched successfully:", projectData);
  // }, []);

  const getAllEmployeesData = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/users/getAllUsers`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch employees");
      }

      const data = await response.json();
      console.log("<<<<<<<<<<<<<<<<<<", data, "<<<<<<<", currentPage);

      // Expecting: { employees: [...], total: number }
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  }, [currentPage]);

  const addemployeesfun = useCallback(
    (projectId) => {
      console.log("Adding employees to project with ID:", projectId);
      if (!projectId) {
        alert("Project ID is required to add employees.");
        return;
      }
      setProjectId(projectId);
      setaddmemberpop(true);
      getAllEmployeesData();
    },
    [getAllEmployeesData]
  );

  const pageCount = Math.ceil(totalCount / ITEMS_PER_PAGE);

  const handlePageClick = useCallback(({ selected }) => {
    setCurrentPage(selected);
  }, []);

  const fetchProjects = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/project/getProjects?offset=${
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
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error || "Failed to fetch projects.");
      if (!Array.isArray(data.rows))
        throw new Error("Unexpected response format from server.");

      setProjects(data.rows);
      setTotalCount(data.count);
    } catch (error) {
      console.error("Error fetching projects:", error.message);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const deleteProject = useCallback(async (projectId) => {
    console.log("Deleting project with ID:", projectId);
    if (!projectId) {
      alert("Project ID is required to delete a project.");
      return;
    }

    try {
      if (!window.confirm("Are you sure you want to delete this project?"))
        return;

      const response = await fetch(
        `http://localhost:3000/api/project/deleteProject/${projectId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (!response.ok) throw new Error("Failed to delete project.");

      setProjects((prevProjects) =>
        prevProjects.filter((project) => project.id !== projectId)
      );
    } catch (error) {
      console.error("Error deleting project:", error.message);
    }
  }, []);

  const handleSelect = (id, role) => {
    setSelectedItems((prev) => {
      const exists = prev.some(
        (item) =>
          item.id === id && item.role === role && item.projectId === projectId
      );
      if (exists) {
        return prev.filter(
          (item) =>
            !(
              item.id === id &&
              item.role === role &&
              item.projectId === projectId
            )
        );
      } else {
        return [...prev, { id, role, projectId }];
      }
    });
  };

  const handleSubmit = useCallback(async () => {
    console.log("Selected Employee IDs:", selectedItems);
    await fetch(`http://localhost:3000/api/project/setprojEmployee`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(selectedItems),
    });

    setProjectId(null);
    setSelectedItems([]);
    setaddmemberpop(false);
    alert("Employees added successfully to the project.");
    fetchProjects(); // Refresh the project list after adding employees
  }, [fetchProjects, selectedItems]);

  return (
    <div className="p-4">
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="w-full text-sm text-left text-gray-700 dark:text-gray-300">
          <thead className="text-xs text-white uppercase bg-blue-600 sticky top-0">
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Project Name</th>
              <th className="px-6 py-3">Client Name</th>
              <th className="px-6 py-3">Start Date</th>
              <th className="px-6 py-3">End Date</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Description</th>
              <th className="px-6 py-3">Manager ID</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr
                key={project.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                <td className="px-6 py-4">{project.id}</td>
                <td className="px-6 py-4">{project.projectName}</td>
                <td className="px-6 py-4">{project.clientName}</td>
                <td className="px-6 py-4">
                  {new Date(project.startDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  {new Date(project.endDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 capitalize">{project.status}</td>
                <td className="px-6 py-4">{project.description}</td>
                <td className="px-6 py-4">{project.managerId}</td>
                <td className="px-6 py-4 flex flex-wrap gap-2 justify-center">
                  <button
                    onClick={() => addemployeesfun(project.id)}
                    className="px-3 py-1 text-xs font-medium bg-green-500 text-white rounded hover:bg-green-600 transition"
                  >
                    Add Member
                  </button>
                  <button
                    // onClick={() => editProject(project.id)}
                    className="px-3 py-1 text-xs font-medium bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteProject(project.id)}
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

      {/* Add Member Modal */}
      {addmemberpop && (
        <div className="p-6 bg-white rounded-lg shadow-md max-w-md w-full mt-6 mx-auto border border-gray-300 relative">
          <button
            onClick={() => setaddmemberpop(false)}
            className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
          >
            ✖
          </button>
          <h2 className="text-lg font-semibold mb-4">Select Employees</h2>

          <div className="space-y-3 max-h-64 overflow-y-auto">
            {employees.map((emp) => {
              const isSelected = selectedItems.some(
                (item) => item.id === emp.id && item.role === emp.role
              );

              return (
                <div
                  key={emp.id}
                  className="flex justify-between items-center border border-gray-200 rounded-lg p-3"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {emp.name}
                    </p>
                    <p className="text-xs text-gray-500">ID: {emp.id}</p>
                  </div>
                  <button
                    onClick={() => handleSelect(emp.id, emp.role)}
                    className={`text-sm px-3 py-1 rounded-lg ${
                      isSelected
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {isSelected ? "Selected" : "Select"}
                  </button>
                </div>
              );
            })}
          </div>

          <div className="mt-4 flex justify-end gap-3">
            <button
              onClick={() => setaddmemberpop(false)}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </div>
      )}

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
