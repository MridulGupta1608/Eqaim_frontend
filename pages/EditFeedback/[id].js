import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import styles from "../../styles/components/main.module.scss";

const EditFeedback = () => {
  const router = useRouter();
  const { id } = router.query;

  const [Suggestions, setSuggestions] = useState([]);

  const goBack = () => {
    window.history.back();
  };

  const Delete = async (e) => {
    e.preventDefault();

    const response = await fetch(`http://localhost:8000/Suggestion/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Suggestion Deleted!!");
    window.location.href = "/";
  };

  const edit = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const category = e.target.category.value;
    const status = e.target.status.value;
    const description = e.target.description.value;

    const response = await fetch(`http://localhost:8000/Suggestion/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...(title && { title }),
        ...(category && { category }),
        ...(description && { description }),
        ...(status && { status }),
      }),
    });

    const data = await response.json();
    console.log({ data });

    if (data.error) {
      console.log(data.error);
    }
    window.location.href = "/";
  };

  useEffect(() => {
    const fetchSuggestion = async () => {
      const response = await fetch(`http://localhost:8000/Suggestion/${id}`, {
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
  }, [id]);

  return (
    <div className="bg-[#F7F8FD] absolute inset-0 w-full h-max -z-10">
      <div className="flex flex-col mx-[24px] md:mx-[114px] lg:mx-[450px] my-[92px]">
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
              stroke="#4661E6"
              stroke-width="2"
            />
          </svg>
          <button
            onClick={goBack}
            className="w-14 h-5"
            style={{ color: "#647196" }}
          >
            <h4>Go Back </h4>
          </button>
        </div>
        <div className="my-[68px] relative flex flex-col px-[42px] rounded-[10px] bg-white">
          <div className="absolute -top-6 left-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="56"
              height="56"
              viewBox="0 0 56 56"
              fill="none"
            >
              <circle
                cx="28"
                cy="28"
                r="28"
                fill="url(#paint0_radial_0_1239)"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M29.0825 19.4809L32.8315 16L39.345 22.2719L35.7969 25.952L29.0825 19.4809ZM16 39.5949C16.9207 35.6533 19.4867 25.5743 19.4867 25.5743L27.6895 20.7535L34.5209 27.1499L29.3017 34.97L16.313 40L22.4703 34.2104C23.513 34.5998 24.9857 34.2478 25.7818 33.3736C26.8328 32.2255 26.7539 30.4423 25.605 29.3914C24.456 28.3404 22.5848 28.3404 21.5339 29.4885C20.751 30.3444 20.4812 31.8544 20.9287 32.8498L16 39.5949Z"
                fill="white"
              />
              <defs>
                <radialGradient
                  id="paint0_radial_0_1239"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="translate(58.184 -5.81647) rotate(129.411) scale(93.4169)"
                >
                  <stop stop-color="#E84D70" />
                  <stop offset="0.530886" stop-color="#A337F6" />
                  <stop offset="1" stop-color="#28A7ED" />
                </radialGradient>
              </defs>
            </svg>
          </div>
          <h1 className="pt-[52px] pb-[40px]">
            Editing ‘{Suggestions?.suggestion?.title}’
          </h1>
          <form onSubmit={edit}>
            <div className=" pb-4">
              <h4>Feedback Title</h4>
              <p className="text_md" style={{ color: "#647196" }}>
                Add a short, descriptive headline
              </p>
            </div>
            <input
              type="text"
              id="title"
              className="bg-[#F7F8FD] p-4 w-full h-[48px] mb-6"
            />
            <h4 for="options">Category</h4>
            <p className="text_md" style={{ color: "#647196" }}>
              Choose a category for your feedback
            </p>
            <select
              id="category"
              className={`bg-[#F7F8FD] mb-6 px-4 w-full h-[48px]  py-3 text_md flex justify-between`}
            >
              <option
                className={`${styles.hover} bg-green-300 border-b w-full text-start pb-3`}
                value="feature"
              >
                Feature
              </option>
              <option
                className={`${styles.hover} border-b w-full text-start pb-3`}
                value="ui"
              >
                UI
              </option>
              <option
                className={`${styles.hover} border-b w-full text-start pb-3`}
                value="ux"
              >
                UX
              </option>
              <option
                className={`${styles.hover} border-b w-full text-start pb-3`}
                value="enhancement"
              >
                Enhancement
              </option>
              <option
                className={`${styles.hover} border-b w-full text-start pb-3`}
                value="bug"
              >
                Bug
              </option>
            </select>
            <h4 for="options">Update Status</h4>
            <p className="text_md" style={{ color: "#647196" }}>
              Change feature state
            </p>
            <select
              id="status"
              className={`bg-[#F7F8FD] mb-6 px-4 w-full h-[48px]  py-3 text_md flex justify-between`}
            >
              <option
                className={`${styles.hover} bg-green-300 border-b w-full text-start pb-3`}
                value="suggestion"
              >
                Suggestion
              </option>
              <option
                className={`${styles.hover} border-b w-full text-start pb-3`}
                value="planned"
              >
                Planned
              </option>
              <option
                className={`${styles.hover} border-b w-full text-start pb-3`}
                value="in-Progress"
              >
                In-Progress
              </option>
              <option
                className={`${styles.hover} border-b w-full text-start pb-3`}
                value="live"
              >
                Live
              </option>
            </select>
            <div className=" pb-4">
              <h4>Feedback Details</h4>
              <p className="text_md" style={{ color: "#647196" }}>
                Include any specific comments on what should be improved, added,
                etc.
              </p>
            </div>
            <input
              type="text"
              id="description"
              className="bg-[#F7F8FD] w-full px-4 py-0 flex flex-wrap h-[96px] mb-8"
            />
            <div className="flex justify-between md:flex-row flex-col gap-4 mb-10">
              <button
                className="button4 md:w-[93px] w-full h-[44px]"
                onClick={Delete}
              >
                Delete
              </button>
              <div className="flex flex-col md:flex-row gap-4">
                <button className="button3 w-full md:w-[93px] h-[44px]">
                  Cancel
                </button>
                <button
                  type="submit"
                  className="button1 w-full md:w-[144px] h-[44px]"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditFeedback;
