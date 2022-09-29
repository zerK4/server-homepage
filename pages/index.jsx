import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Home() {
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get("/api/resources");
      console.log(data);
    };
    getData();
  }, []);

  return (
    <div className="underline">
      <h1 className="font-bold">Some text in here</h1>
    </div>
  );
}
