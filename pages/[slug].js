import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Image from "next/legacy/image";
import Link from "next/link";

const Details = () => {
  const [Suggestions, setSuggestions] = useState([]);
  const [reply1, setReply1] = useState(null);
  const [reply2, setReply2] = useState(null);

  const goBack = () => {
    window.history.back();
  };

  const handelReply1 = (commentId) => {
    setReply1(commentId);
    setReply2(null);

    if (reply1 != null) {
      setReply1(null);
    }
  };

  const handelReply2 = (replyId) => {
    setReply2(replyId);
    setReply1(null);

    if (reply2 != null) {
      setReply2(null);
    }
  };

  const router = useRouter();
  const { slug } = router.query;

  // Fix Reply section

  useEffect(() => {
    const fetchSuggestion = async () => {
      const response = await fetch(`http://localhost:8000/Suggestion/${slug}`, {
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
  }, [slug]);

  console.log(Suggestions?.suggestion?.comments);

  return (
    <div className="bg-[#F7F8FD] absolute inset-0 w-full h-max -z-10">
      <div className="flex flex-col gap-6 my-24 mx-[24px] md:mx-[40px] lg:mx-[355px]">
        <div className="flex justify-between">
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
            <button onClick={goBack} className="w-14 h-5">
              <h4>Go Back </h4>
            </button>
          </div>
          <Link
            href={`/EditFeedback/${slug}`}
            className="w-[142px] h-[44px] button2"
          >
            Edit Feedback
          </Link>
        </div>
        <div className="flex bg-white rounded-[10px] items-center justify-between  px-8 py-7 h-[151px]">
          <div className="flex gap-10">
            <div className="flex gap-2 flex-col btn w-10 h-[53px] ">
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
              <p className="text_sm_bold">{Suggestions?.suggestion?.upvotes}</p>
            </div>
            <div className="flex flex-col gap-1">
              <h2>{Suggestions?.suggestion?.title}</h2>
              <p className="text_lg" style={{ color: "#647196" }}>
                {Suggestions?.suggestion?.description}
              </p>
              <div className="btn capitalize w-[111px] h-[30px] mt-2">
                {Suggestions?.suggestion?.category}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
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
            <p className="text_sm_bold">
              {Suggestions?.suggestion?.comments.length}
            </p>
          </div>
        </div>

        <div className="flex px-8 py-6 bg-white rounded-[10px] flex-col">
          <h3>{Suggestions?.suggestion?.comments.length} Comments</h3>
          {Suggestions?.suggestion?.comments.map((item, key) => (
            <div className="flex flex-col gap-8 my-8">
              <div className="flex gap-8 w-full items-start">
                <div className="w-24">
                  <Image
                    src={`${item?.user?.image}`}
                    className="rounded-full w-10 h-10"
                    width={40}
                    height={40}
                  />
                </div>
                <div className="flex flex-col">
                  <div className="flex flex-col gap-4">
                    <div className="flex w-full justify-between">
                      <div className="flex flex-col">
                        <h4>{item?.user?.name}</h4>
                        <p className="text_md" style={{ color: "#647196" }}>
                          @{item?.user?.username}
                        </p>
                      </div>
                      <button
                        onClick={() => handelReply1(item.id)}
                        className="text_sm_bold"
                        style={{ color: "#4661E6" }}
                      >
                        Reply
                      </button>
                    </div>
                    <p className="text_lg" style={{ color: "#647196" }}>
                      {item?.content}
                    </p>
                  </div>
                  {reply1 && (
                    <div className="flex gap-4 mt-6">
                      <input
                        type="text"
                        className="w-[461px] bg-[#F7F8FD] rounded-[5px] px-6 h-[80px] text-md"
                        style={{ color: "#8C92B3" }}
                        placeholder="Type your comment hear"
                      />
                      <div className="flex">
                        <button
                          className={`button1 w-[117px] h-[44px] mt-4 mb-8`}
                        >
                          {" "}
                          Post Reply
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {item?.replies.length != 0 &&
                item?.replies.map((reply) => (
                  <div className="flex gap-8 ml-10 w-full max-w-[627px] items-start">
                    <div className="w-24">
                      <Image
                        src={`${reply?.user?.image}`}
                        className="rounded-full w-10 h-10"
                        width={40}
                        height={40}
                      />
                    </div>
                    <div className="flex flex-col w-full gap-4">
                      <div className="flex w-full justify-between">
                        <div className="flex flex-col">
                          <h4>{reply?.user?.name}</h4>
                          <p className="text_md" style={{ color: "#647196" }}>
                            @{reply?.user?.username}
                          </p>
                        </div>
                        <button
                          onClick={() => handelReply2(reply._id)}
                          className="text_sm_bold"
                          style={{ color: "#4661E6" }}
                        >
                          Reply
                        </button>
                      </div>
                      <div className="text_lg" style={{ color: "#647196" }}>
                        <span style={{ color: "#AD1FEA" }}>
                          @{item?.user?.username}
                        </span>{" "}
                        {reply?.content}
                      </div>
                      {reply2 && (
                        <div className="flex gap-4 mt-6">
                          <input
                            type="text"
                            className="w-[416px] bg-[#F7F8FD] rounded-[5px] px-6 h-[80px] text-md"
                            style={{ color: "#8C92B3" }}
                            placeholder="Type your comment hear"
                          />
                          <div className="flex">
                            <button
                              className={`button1 w-[117px] h-[44px] mt-4 mb-8`}
                            >
                              {" "}
                              Post Reply
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          ))}
        </div>

        <div className="flex flex-col bg-white rounded-[10px] px-8">
          <h2 className="py-6">Add Comment</h2>
          <input
            type="text"
            className="max-w-[664px] bg-[#F7F8FD] rounded-[5px] px-6 h-[80px] text-md"
            style={{ color: "#8C92B3" }}
            placeholder="Type your comment hear"
          />
          <div className="flex justify-end">
            <button className={`button1 w-[142px] h-[44px] mt-4 mb-8`}>
              {" "}
              Post Comment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
