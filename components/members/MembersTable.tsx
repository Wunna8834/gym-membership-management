"use client";
import React, { ChangeEvent, useCallback, useEffect, useMemo, useReducer, useState } from "react";
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
import { INITIAL_STATE, customerReducer } from "@/reducer/customerReducer";

interface Customer {
  _id: string;
  name: string;
  gender: string;
  paymentType: string;
  expireDate: Date;
}

const MembersTable = () => {
  const [state, dispatch] = useReducer(customerReducer, INITIAL_STATE);
  const [searchValue, setSearchValue] = useState("");
  console.log("Search value", searchValue);
  // function handleSearchChange(e: ChangeEvent<HTMLInputElement>) {
  //   const value = e.target.value;
  //   setSearchValue(value);
  // }
  const handleSearchChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
  }, []);

  const fetchCustomersMemoized = useMemo(() => {
    return async () => {
      let apiURL = "/api/customer/getAllCustomers";
      const isSearch = Boolean(searchValue);

      dispatch({ type: isSearch ? "SEARCH" : "FETCH_START" });

      try {
        if (isSearch) {
          apiURL += `?name=${searchValue}`;
        }

        const res = await fetch(apiURL);
        const result = await res.json();
        dispatch({
          type: isSearch ? "SEARCH_SUCCESS" : "FETCH_SUCCESS",
          payload: result,
        });
      } catch (error) {
        dispatch({ type: isSearch ? "SEARCH_ERROR" : "FETCH_ERROR" });
      }
    };
  }, [searchValue]);
  // async function fetchCustomers() {
  //   let apiURL = "/api/customer/getAllCustomers";
  //   const isSearch = Boolean(searchValue);

  //   dispatch({ type: isSearch ? "SEARCH" : "FETCH_START" });

  //   try {
  //     if (isSearch) {
  //       apiURL += `?name=${searchValue}`;
  //     }

  //     const res = await fetch(apiURL);
  //     const result = await res.json();
  //     console.log("Api response", result)
  //     dispatch({
  //       type: isSearch ? "SEARCH_SUCCESS" : "FETCH_SUCCESS",
  //       payload: result,
  //     });
  //   } catch (error) {
  //     dispatch({ type: isSearch ? "SEARCH_ERROR" : "FETCH_ERROR" });
  //   }
  // }

  const handleEditSuccess = () => {
    //call back for on success of delete or edit
    // fetchCustomers();
    fetchCustomersMemoized()
  };
  useEffect(() => {
    // fetchCustomers();
    fetchCustomersMemoized()
  }, [fetchCustomersMemoized]);
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
          {state.loading ? (
            <TableRow>
              <TableCell className="w-full" colSpan={4}>
                <Loading />
              </TableCell>
            </TableRow>
          ) : state.data && state.data.length > 0 ? (
            state.data.map((customer: Customer, index: number) => (
              <TableRow key={customer._id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.paymentType}</TableCell>
                <TableCell>
                  <UserActions
                    _id={customer._id}
                    name={customer.name}
                    payment={customer.paymentType}
                    onEditSuccess={handleEditSuccess}
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell className="w-full" colSpan={4}>
                Customer Not Found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default MembersTable;
