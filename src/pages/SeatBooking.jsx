import React, { useEffect, useState } from "react";

export default function SeatBooking() {
  const [rows, setRows] = useState(3);
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    fetchSeats(rows);
  }, [rows]);

  const fetchSeats = async (rowCount) => {
    try {
      const response = await fetch(`https://codebuddy.review/seats?count=${rowCount}`);
      const data = await response.json();
      console.log(data);
      setSeats(data?.data);
    } catch (error) {
      console.error("Error fetching seats:", error);
    }
  };

  const handleRowChange = (event) => {
    const rowCount = parseInt(event.target.value, 10);
    setRows(rowCount);
  };

  const handleSeatSelect = (seatId, rowNumber) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((id) => id !== seatId));
      setTotalCost(totalCost - (10 * rowNumber + 20));
    } else {
      if (selectedSeats.length < 5) {
        setSelectedSeats([...selectedSeats, seatId]);
        setTotalCost(totalCost + (10 * rowNumber + 20));
      }
    }
  };

  const handleSubmit = async () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat.");
      return;
    }

    try {
      const response = await fetch("https://codebuddy.review/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedSeats),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error submitting seats:", error);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-4">
        <label htmlFor="row-count" className="block text-sm font-medium text-gray-700">
          Number of rows:
        </label>
        <input
          type="number"
          id="row-count"
          min="3"
          max="10"
          value={rows}
          onChange={handleRowChange}
          className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        />
        <button
          onClick={() => fetchSeats(rows)}
          className="mt-2 rounded-lg bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          Fetch Seats
        </button>
      </div>
      <div className="space-y-2">
        {seats.map((row, index) => (
          <div key={index} className="flex justify-center">
            {row.seats.map((seat) => (
              <button
                key={seat.id}
                disabled={seat.isReserved}
                onClick={() => handleSeatSelect(seat.id, seat.row)}
                className={`mx-1 rounded-lg border px-3 py-2 ${
                  seat.isReserved ? "cursor-not-allowed bg-gray-300" : "bg-white"
                } ${
                  selectedSeats.includes(seat.id) ? "bg-green-500 text-white" : "hover:bg-green-100"
                }`}
              >
                {`Row ${seat.row} Seat ${seat.seatNumber}`}
                {seat.isReserved ? <ReservedFlag /> : <UnreservedFlag />}
              </button>
            ))}
          </div>
        ))}
      </div>
      <div className="mt-4">
        <p className="text-xl font-semibold">
          Total Cost: <span className="text-green-500">${totalCost}</span>
        </p>
        <button
          onClick={handleSubmit}
          className="mt-2 rounded-lg bg-indigo-600 px-4 py-2 font-bold text-white hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75"
        >
          Submit Selection
        </button>
      </div>
    </div>
  );
}

function ReservedFlag() {
  return (
    <div class="flex items-center justify-center rounded bg-red-600 px-2 py-1 text-sm text-white">
      <span>Reserved</span>
    </div>
  );
}

function UnreservedFlag() {
  return (
    <div class="flex items-center justify-center rounded bg-green-600 px-2 py-1 text-sm text-white">
      <span>Available</span>
    </div>
  );
}
