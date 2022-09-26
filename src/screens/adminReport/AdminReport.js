import React, { useState, useEffect } from "react";
import {
  COLUMNS_REQUEST1,
  COLUMNS_REQUEST2,
  COLUMNS_REQUEST3,
} from "./columns";
import { Table } from "./table";

const AdminReport = ({
  baseUrl,
  accessToken,
  loggedInUserId,
  setAccessToken,
}) => {
  const [bloodBank, setBloodBank] = useState([]);
  const [request, setRequest] = useState([]);
  const [user, setUser] = useState([]);
  //----------------------Get Requests from backend------------------------

  const fetchRequests = async () => {
    await fetch(`http://localhost:8080/bb/user/allRequests`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((json) => {
            console.log("Printing backend data", json);
            setRequest(json);
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchBloodBanks = async () => {
    await fetch(`http://localhost:8080/bb/bloodbanksall`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((json) => {
            console.log("Printing blood bank backend data", json);
            setBloodBank(json);
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchUserDetails = async () => {
    await fetch(`http://localhost:8080/bb/users/getAllUsers`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((json) => {
            console.log("Printing user backend data", json);
            setUser(json);
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchUserDetails();
    fetchRequests();
    fetchBloodBanks();
  }, []);

  // const columns = useMemo(() => COLUMNS_REQUEST1, []);
  // const data = useMemo(() => request, [request]);

  // const tableInstance1 = useTable({
  //   columns: columns,
  //   data : data
  // });

  // const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = tableInstance1;

  // const columns1 = useMemo(() => COLUMNS_REQUEST2, []);
  // const data1 = useMemo(() => bloodBank, [bloodBank]);

  // const tableInstance2 = useTable({
  //   columns: columns1,
  //   data : data1
  // });

  // const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = tableInstance2;

  // const columns2 = useMemo(() => COLUMNS_REQUEST3, []);
  // const data2 = useMemo(() => bloodBank, [bloodBank]);

  // const tableInstance3 = useTable({
  //   columns: columns2,
  //   data : data2
  // });

  // const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = tableInstance3;

  //returning
  return (
    <React.Fragment>
      <h3>All Requests Raised For Blood</h3>
      <Table columns={COLUMNS_REQUEST1} data={request} />
      <h3>All the Blood Banks Registered</h3>
      <Table columns={COLUMNS_REQUEST2} data={bloodBank} />
      <h3>All the Registered Users</h3>
      <Table columns={COLUMNS_REQUEST3} data={user} />
    </React.Fragment>
  );
};
export default AdminReport;
