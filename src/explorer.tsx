import React from "react";
import axios from "axios";
import {  QueryClient, QueryClientProvider, useQuery } from 'react-query';
const queryClient = new QueryClient();
const endpoint = "https://arweave.net/graphql";

function Artags() {  
    const ARV_QUERY = `
    query {
        transactions {
            edges {
                node {
                    id
                    tags {
                        name
                        value
                    }
                }
            }
        }
    }
    `;
  const { data, isLoading, error } = useQuery("tagnames", () => {
    return fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: ARV_QUERY })
    })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("Error fetching data");
        } else {
          return response.json();
        }
      })
      .then((data) => data.data);
  });

  if (isLoading) return "Loading...";
  if (error) return <pre>{error.message}</pre>;
  return (
    <div>
      <h1><b>Arweave Tags</b></h1>
      {JSON.stringify(data)}
    </div>
  );
}

function Arpayment() {  
  const ARV_QUERY = `
  query {
    transactions {
        edges {
            node {
                id
                recipient
                owner {
                    address
                    key
                }
                fee {
                    winston
                    ar
                }
                quantity {
                    winston
                    ar
                }
            }
        }
    }
}
  `;
const { data, isLoading, error } = useQuery("paymentnames", () => {
  return fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: ARV_QUERY })
  })
    .then((response) => {
      if (response.status >= 400) {
        throw new Error("Error fetching data");
      } else {
        return response.json();
      }
    })
    .then((data) => data.data);
});

if (isLoading) return "Loading...";
if (error) return <pre>{error.message}</pre>;
return (
  <div>
    <h1><b>Arweave Payment Data</b></h1>
    {JSON.stringify(data)}
  </div>
);
}

function Arblock() {  
  const ARV_QUERY = `
  query {
    transactions {
        edges {
            node {
                block {
                    id
                    timestamp
                    height
                    previous
                }
            }
        }
    }
}
  `;
const { data, isLoading, error } = useQuery("blockdata", () => {
  return fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: ARV_QUERY })
  })
    .then((response) => {
      if (response.status >= 400) {
        throw new Error("Error fetching data");
      } else {
        return response.json();
      }
    })
    .then((data) => data.data);
});

if (isLoading) return "Loading...";
if (error) return <pre>{error.message}</pre>;
return (
  <div>
    <h1><b>Block Meta Data</b></h1>
    {JSON.stringify(data)}
  </div>
);
}


export default function Explorer(){
  return(<QueryClientProvider client={queryClient}>
          <Artags/>
          <Arpayment/>
          <Arblock/>
      </QueryClientProvider>
  );
}