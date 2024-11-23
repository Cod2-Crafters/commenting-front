"use client";
import axiosClient from "@/axios.config";
import ContentLayout from "@/components/layouts/content-layout";
import ProfileCard from "@/components/profile-card";
import { getImageUrl } from "@/lib/utils";
import { APIResponseMsg, StatisticInfo } from "@/schemas";
import { AppDispatch, RootState } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface StatisticContentProps {}

const StatisticContent = ({ ...props }: StatisticContentProps) => {
  const authSelector = useSelector((state: RootState) => state.auth);

  const fetchStatistics = async () => {
    const response = await axiosClient.get<APIResponseMsg<StatisticInfo>>(
      "/api/statistics",
      {
        headers: {
          Authorization: `Bearer ${authSelector.token}`,
        },
      }
    );
    return response.data;
  };

  const statisticsQuery = useQuery({
    queryKey: ["statistics", authSelector.token],
    queryFn: fetchStatistics,
  });

  return (
    <>
      {statisticsQuery.isLoading === false && (
        <ContentLayout>
          <div>
            <h2 className="text-2xl font-semibold mb-4">통계</h2>
            <div className="flex flex-col gap-8">
              <hr className="border-primary" />
              <div className="flex flex-col gap-8">
                <div className="flex flex-row justify-between">
                  <h4 className="text-xl font-semibold">내가 받은 좋은 질문</h4>
                  <div className="text-xl font-semibold">
                    {statisticsQuery.data.data.goodQuestionCount}
                  </div>
                </div>
                <div className="flex flex-row justify-between">
                  <h4 className="text-xl font-semibold">내가 받은 질문</h4>
                  <div className="text-xl font-semibold">
                    {statisticsQuery.data.data.receivedQuestionCount}
                  </div>
                </div>
                <div className="flex flex-row justify-between">
                  <h4 className="text-xl font-semibold">
                    다른 사람에게 작성한 질문
                  </h4>
                  <div className="text-xl font-semibold">
                    {statisticsQuery.data.data.sentQuestionCount}
                  </div>
                </div>
                <div className="flex flex-row justify-between">
                  <h4 className="text-xl font-semibold">작성한 답변</h4>
                  <div className="text-xl font-semibold">
                    {statisticsQuery.data.data.answerCount}
                  </div>
                </div>
                <div className="flex flex-row justify-between">
                  <h4 className="text-xl font-semibold">답변하지 않은 질문</h4>
                  <div className="text-xl font-semibold">
                    {statisticsQuery.data.data.unansweredQuestionCount}
                  </div>
                </div>
              </div>
              <hr className="mb-4 border-muted" />
            </div>
          </div>
          {/* 질문한 유저 리스트 */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">질문한 유저리스트</h2>
            <div className="flex flex-row gap-2 w-full overflow-y-auto hidden-scroll hover:scrollbar p-4">
              {statisticsQuery.data.data.questionedUsers.map((userInfo) => {
                return (
                  <ProfileCard
                    key={userInfo?.memberId}
                    imagePath={getImageUrl(userInfo?.avatarPath)}
                    name={""}
                    imageSize={80}
                    isZoom={true}
                  />
                );
              })}
            </div>
          </div>
          <hr className="mb-4 border-muted" />
        </ContentLayout>
      )}
    </>
  );
};

export default StatisticContent;
