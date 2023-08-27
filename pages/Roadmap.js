import React, { useEffect, useState } from "react";
import Link from "next/link";
import useMediaQuery from "@mui/material/useMediaQuery";

const Roadmap = () => {
  const goBack = () => {
    window.history.back();
  };

  //Make mobile buttons active on click

  const [suggestions, setSuggestions] = useState([]);
  const [progress, setProgress] = useState(false);
  const [planned, setPlanned] = useState(true);
  const [live, setLive] = useState(false);

  const handelPlanned = () => {
    setPlanned(true);
    setProgress(false);
    setLive(false);
  };

  const handelProgress = () => {
    setProgress(true);
    setPlanned(false);
    setLive(false);
  };

  const handelLive = () => {
    setProgress(false);
    setPlanned(false);
    setLive(true);
  };

  const liveStatusCount = suggestions.reduce((count, suggestion) => {
    if (suggestion.status === "live") {
      return count + 1;
    }
    return count;
  }, 0);

  const planningStatusCount = suggestions.reduce((count, suggestion) => {
    if (suggestion.status === "planned") {
      return count + 1;
    }
    return count;
  }, 0);

  const progressStatusCount = suggestions.reduce((count, suggestion) => {
    if (suggestion.status === "in-progress") {
      return count + 1;
    }
    return count;
  }, 0);

  const planningSuggestions = suggestions.filter(
    (item) => item.status === "planned"
  );

  const progressSuggestions = suggestions.filter(
    (item) => item.status === "in-progress"
  );
  const liveSuggestions = suggestions.filter((item) => item.status === "live");

  console.log(planningSuggestions);

  useEffect(() => {
    const fetchSuggestion = async () => {
      const response = await fetch("http://localhost:8000/Suggestion", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      setSuggestions(data);
    };
    fetchSuggestion();
  }, []);

  const isMediumScreen = useMediaQuery("(min-width: 1024px)");

  return (
    <div className="bg-[#F7F8FD] absolute inset-0 w-full h-max -z-10">
      <div className="flex flex-col md:mx-[40px] lg:mx-[165px] md:my-[78px] md:gap-[30px]">
        <div className="bg-[#373F68] md:rounded-[10px] items-center justify-between px-8 md:mb-12 h-[113px] w-full flex">
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="6"
                height="10"
                viewBox="0 0 6 10"
                fill="none"
              >
                <path
                  d="M4.33447 9L0.334473 5L4.33447 1"
                  stroke="#CDD2EE"
                  stroke-width="2"
                />
              </svg>
              <button
                onClick={goBack}
                className="w-14 h-5"
                style={{ color: "#647196" }}
              >
                <h4 style={{ color: "#fff" }}>Go Back </h4>
              </button>
            </div>
            <h1 style={{ color: "#fff" }}>Roadmap</h1>
          </div>
          <Link
            href="/NewFeedback"
            className="button1 w-[134px] h-[40px] md:w-[158px] md:h-[44px]"
          >
            + Add Function
          </Link>
        </div>
        <div className="flex md:hidden justify-between items-center h-[55px] w-full">
          <button
            onClick={handelPlanned}
            className={`text-[#3A4374] flex text-[13px] font-bold text-center w-full justify-center ${
              planned
                ? "active:opacity-100 opacity-100 border-b-4 border-[#F49F85]"
                : "opacity-40"
            }`}
          >
            Planned ({planningStatusCount})
          </button>
          <button
            onClick={handelProgress}
            className={`text-[#3A4374] flex text-[13px] font-bold text-center w-full justify-center ${
              progress
                ? "active:opacity-100 opacity-100 border-b-4 border-[#AD1FEA]"
                : "opacity-40"
            }`}
          >
            In-Progress ({progressStatusCount})
          </button>
          <button
            onClick={handelLive}
            className={`text-[#3A4374] flex text-[13px] font-bold text-center w-full justify-center ${
              live
                ? "active:opacity-100 opacity-100 border-b-4 border-[#62BCFA]"
                : "opacity-40"
            }`}
          >
            Live ({liveStatusCount})
          </button>
        </div>
        <div className="md:grid md:grid-cols-3 gap-[30px]">
          {(isMediumScreen || planned) && (
            <div className=" grid-cols-1">
              <div className="flex flex-col p-6">
                <h3>Planned ({planningStatusCount})</h3>
                <p className="text_lg mb-8" style={{ color: "#647196" }}>
                  Ideas prioritized for research
                </p>
                {planningSuggestions?.map((item) => (
                  <div className="flex flex-col mb-6 bg-white rounded-[5px] md:p-5 p-8 border-t-[6px] border-[#F49F85] md:h-[251px] lg:h-[272px]">
                    <div className="flex gap-3 mb-2">
                      <div className="pt-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="8"
                          height="8"
                          viewBox="0 0 8 8"
                          fill="none"
                        >
                          <circle cx="4" cy="4" r="4" fill="#F49F85" />
                        </svg>
                      </div>
                      <p className="text_lg" style={{ color: "#647196" }}>
                        Planned
                      </p>
                    </div>
                    <Link href={`/${item?._id}`}>
                      <p className=" font-bold md:text-[13px] lg:text-lg">
                        {item?.title}
                      </p>
                      <p className="text_lg mb-4" style={{ color: "#647196" }}>
                        {item?.description}
                      </p>
                      <button className="btn capitalize py-1 px-4 mb-4 w-[77px] h-[30px]">
                        {item?.category}
                      </button>
                    </Link>
                    <div className="flex justify-between">
                      <div className="flex gap-2 btn w-[69px] h-[40px] ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="11"
                          height="7"
                          viewBox="0 0 11 7"
                          fill="none"
                        >
                          <path
                            d="M1.33447 6L5.33447 2L9.33447 6"
                            stroke="#4661E6"
                            stroke-width="2"
                          />
                        </svg>
                        <p className="text_sm_bold">{item?.upvotes}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="16"
                          viewBox="0 0 18 16"
                          fill="none"
                        >
                          <path
                            d="M2.62074 16H1.34534L2.24718 15.0895C2.73344 14.5986 3.0371 13.9601 3.11873 13.2674C1.03637 11.8878 0 9.88917 0 7.79388C0 3.92832 3.51913 0 9.0305 0C14.8692 0 18 3.61479 18 7.45522C18 11.321 14.8361 14.9333 9.0305 14.9333C8.0135 14.9333 6.95226 14.7963 6.00478 14.5448C5.10787 15.4735 3.89262 16 2.62074 16Z"
                            fill="#CDD2EE"
                          />
                        </svg>
                        <p className="text_sm_bold">{item?.comments.length}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {(isMediumScreen || progress) && (
            <div className=" grid-cols-1">
              <div className="flex flex-col p-6">
                <h3>In-Progress ({progressStatusCount})</h3>
                <p className="text_lg mb-8" style={{ color: "#647196" }}>
                  Currently being developed
                </p>
                {progressSuggestions?.map((item) => (
                  <div className="flex flex-col mb-6 bg-white rounded-[5px] p-8 border-t-[6px] border-[#AD1FEA] h-[272px]">
                    <div className="flex gap-3 mb-2">
                      <div className="pt-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="8"
                          height="8"
                          viewBox="0 0 8 8"
                          fill="none"
                        >
                          <circle cx="4" cy="4" r="4" fill="#AD1FEA" />
                        </svg>
                      </div>
                      <p className="text_lg" style={{ color: "#647196" }}>
                        In Progress
                      </p>
                    </div>
                    <Link href={`/${item?._id}`}>
                      <h3>{item?.title}</h3>
                      <p className="text_lg mb-4" style={{ color: "#647196" }}>
                        {item?.description}
                      </p>
                      <button className="btn capitalize py-1 px-4 mb-4 w-[77px] h-[30px]">
                        {item?.category}
                      </button>
                    </Link>
                    <div className="flex justify-between">
                      <div className="flex gap-2 btn w-[69px] md:h-[32px] lg:h-[40px] ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="11"
                          height="7"
                          viewBox="0 0 11 7"
                          fill="none"
                        >
                          <path
                            d="M1.33447 6L5.33447 2L9.33447 6"
                            stroke="#4661E6"
                            stroke-width="2"
                          />
                        </svg>
                        <p className="text_sm_bold">{item?.upvotes}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="16"
                          viewBox="0 0 18 16"
                          fill="none"
                        >
                          <path
                            d="M2.62074 16H1.34534L2.24718 15.0895C2.73344 14.5986 3.0371 13.9601 3.11873 13.2674C1.03637 11.8878 0 9.88917 0 7.79388C0 3.92832 3.51913 0 9.0305 0C14.8692 0 18 3.61479 18 7.45522C18 11.321 14.8361 14.9333 9.0305 14.9333C8.0135 14.9333 6.95226 14.7963 6.00478 14.5448C5.10787 15.4735 3.89262 16 2.62074 16Z"
                            fill="#CDD2EE"
                          />
                        </svg>
                        <p className="text_sm_bold">{item?.comments.length}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {(isMediumScreen || live) && (
            <div className=" grid-cols-1">
              <div className="flex flex-col p-6">
                <h3>Live ({liveStatusCount})</h3>
                <p className="text_lg mb-8" style={{ color: "#647196" }}>
                  Released features
                </p>
                {liveSuggestions?.map((item) => (
                  <div className="flex flex-col mb-6 bg-white rounded-[5px] mb-6 p-8 border-t-[6px] border-[#62BCFA] h-[272px]">
                    <div className="flex gap-3 mb-2">
                      <div className="pt-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="8"
                          height="8"
                          viewBox="0 0 8 8"
                          fill="none"
                        >
                          <circle cx="4" cy="4" r="4" fill="#62BCFA" />
                        </svg>
                      </div>
                      <p className="text_lg" style={{ color: "#647196" }}>
                        Live
                      </p>
                    </div>
                    <Link href={`/${item?._id}`}>
                      <h3>{item?.title}</h3>
                      <p className="text_lg mb-4" style={{ color: "#647196" }}>
                        {item?.description}
                      </p>
                      <button className="btn capitalize py-1 px-4 mb-4 w-fit h-[30px]">
                        {item?.category}
                      </button>
                    </Link>
                    <div className="flex justify-between">
                      <div className="flex gap-2 btn w-[69px] h-[40px] ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="11"
                          height="7"
                          viewBox="0 0 11 7"
                          fill="none"
                        >
                          <path
                            d="M1.33447 6L5.33447 2L9.33447 6"
                            stroke="#4661E6"
                            stroke-width="2"
                          />
                        </svg>
                        <p className="text_sm_bold">{item?.upvotes}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="16"
                          viewBox="0 0 18 16"
                          fill="none"
                        >
                          <path
                            d="M2.62074 16H1.34534L2.24718 15.0895C2.73344 14.5986 3.0371 13.9601 3.11873 13.2674C1.03637 11.8878 0 9.88917 0 7.79388C0 3.92832 3.51913 0 9.0305 0C14.8692 0 18 3.61479 18 7.45522C18 11.321 14.8361 14.9333 9.0305 14.9333C8.0135 14.9333 6.95226 14.7963 6.00478 14.5448C5.10787 15.4735 3.89262 16 2.62074 16Z"
                            fill="#CDD2EE"
                          />
                        </svg>
                        <p className="text_sm_bold">{item?.comments.length}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
