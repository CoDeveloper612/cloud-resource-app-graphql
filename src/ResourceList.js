// src/ResourceList.js
import React, { useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { TextField, List, ListItem, ListItemText } from '@mui/material';  // For UI components

const GET_RESOURCES = gql`
  query GetResources {
    resources {
      id
      name
      type
      status
    }
  }
`;

const ResourceList = () => {
  const { loading, error, data } = useQuery(GET_RESOURCES);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredResources, setFilteredResources] = useState([]);

  useEffect(() => {
    if (data && data.resources) {
      setFilteredResources(data.resources);
    }
  }, [data]);

  useEffect(() => {
    if (data && data.resources) {
      setFilteredResources(
        data.resources.filter((resource) =>
          resource.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading resources: {error.message}</p>;

  return (
    <div>
      <TextField
        label="Search Resources"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <List>
        {filteredResources.map((resource) => (
          <ListItem key={resource.id}>
            <ListItemText primary={resource.name} secondary={`${resource.type} - ${resource.status}`} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default ResourceList;
