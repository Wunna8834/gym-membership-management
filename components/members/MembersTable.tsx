"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import UserActions from "./UserActions";
import Search from "../Search";
import Image from "next/image";
import Loading from "./Loading";

interface Customer {
  _id: string;
  name: string;
  paymentType: string;
}

const MembersTable = () => {
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  console.log(data);
  function handleSearchChange(e: ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value);
  }
  useEffect(() => {
    const fetchCustomers = async () => {
      let apiURL = "/api/customer/getAllCustomers";
      if (searchValue) {
        apiURL += `?name=${searchValue}`;
      }
      const res = await fetch(apiURL);
      const result = await res.json();
      setData(result);
    };
    fetchCustomers();
  }, [searchValue]);
  return (
    <>
      <Search onSearchChange={handleSearchChange} />
      <Table>
        <TableCaption>Our beloved customers</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Membership Type</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data && data.length > 0 ? (
            data.map((customer: Customer, index: number) => (
              <TableRow key={customer._id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.paymentType}</TableCell>
                <TableCell>
                  <UserActions
                    _id={customer._id}
                    name={customer.name}
                    payment={customer.paymentType}
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell className="w-full" colSpan={4}>
                {/* <h2 className="font-semibold text-4xl text-center animate-pulse">Loading...Please Wait</h2> */}
                <Loading />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default MembersTable;
