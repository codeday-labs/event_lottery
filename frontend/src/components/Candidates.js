import React, { useState, useEffect } from "react";
import { ListGroup, Form } from "react-bootstrap";
import axios from "axios";
const baseURL =
  process.env.NODE_ENV === "production"
    ? ""
    : process.env.REACT_APP_BACKEND_API;

export const Candidates = ({ id, state }) => {
  const [candidates, setCandidates] = useState({ info: [], invite: [] });

  useEffect(() => {
    const fetchData = async () => {
      const respInfo = await axios.get(`${baseURL}/api/v1/candidates/${id}`);
      const respInvite = await axios.get(
        `${baseURL}/api/v1/occurrence-winners/${id}`
      );
      setCandidates({ info: respInfo.data, invite: respInvite.data });
    };
    fetchData();
  }, [state]);

  const markAbsent = (phoneNumber) => {
    axios
      .post(`${baseURL}/api/v1/remove-attendee/${id}`, phoneNumber)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1>Candidates</h1>
      {
        <ListGroup>
          {candidates &&
            candidates.info.map((row, index) => {
              return (
                <ListGroup.Item>
                  Name: {row.FirstName} {row.LastName}, Phone: {row.PhoneNumber}
                  , Status:{" "}
                  {candidates.invite[index] ? (
                    candidates.invite[index] !== 1 ? (
                      candidates.invite[index] === 2 ? (
                        <div className="inline2">
                          <Form inline>
                            <Form.Label>Invitation Accepted!</Form.Label>
                            <span>&nbsp;&nbsp;</span>
                            <Form.Check
                              type="checkbox"
                              label="Absent"
                              disabled={
                                candidates.invite[index] === 2 ? false : true
                              }
                              onChange={() => markAbsent(row.PhoneNumber)}
                            />
                          </Form>
                        </div>
                      ) : (
                        "Invitation Declined"
                      )
                    ) : (
                      "Invitation Sent!"
                    )
                  ) : (
                    "No Invitation"
                  )}
                </ListGroup.Item>
              );
            })}
        </ListGroup>
      }
    </div>
  );
};
