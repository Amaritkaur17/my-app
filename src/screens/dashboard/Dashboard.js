import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);
var arr = [];
var fetched = false;
const Dashboard = ({
  baseUrl,
  accessToken,
  setAccessToken,
  loggedInUserId,
  setLoggedInUserId,
}) => {
  const [chart, setChart] = useState({});

  const fetchAllBloodGrpData = async () => {
    await fetch(`http://localhost:8080/bb/details/totalBloodQuantity`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((json) => {
            console.log("Printing backend data", json);
            setChart(json);
            Object.keys(chart).forEach(function (key) {
              arr.push(chart[key]);
            });
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    // if (!fetched) {
    fetchAllBloodGrpData();
    //   fetched = true;
    // }
  }, []);

  console.log("Chart data " + chart);
  var data = {
    labels: arr.map((x) => x.bloodGroup),
    datasets: [
      {
        label: `${arr.length} Blood Groups Available`,
        data: arr.map((x) => x.quantity),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  var options = {
    maintainAspectRatio: false,
    scales: {},
    legend: {
      labels: {
        fontSize: 25,
      },
    },
  };

  return (
    <div>
      <div>
        <h4>Today's Blood group Wise availability</h4>
      </div>
      <div>
        <Pie data={data} height={400} options={options} />
      </div>
    </div>
  );
};

export default Dashboard;
