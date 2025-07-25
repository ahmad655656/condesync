'use client'
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

const useGetCalls = () => {
  const { user } = useUser();
  const client = useStreamVideoClient();
  const [calls, setCalls] = useState<Call[]>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadCalls = async () => {
      if (!client || !user?.id) return;

      setIsLoading(true);

      try {
        const { calls } = await client.queryCalls({
          sort: [{ field: "starts_at", direction: -1 }],
          filter_conditions: {
            starts_at: { $exists: true },
            $or: [
              { created_by_user_id: user.id },
              { member: { $in: [user.id] } },
            ],
          },
        });
      } catch (error) {
        console.error(error)
      }
      finally{
        setIsLoading(false);
      }
    };
  }, [client, user?.id]);


  const now = new Date();
  const endedCalls = calls?.filter(({state: {startedAt, endedAt} } : Call) => {
    return ( startedAt && new Date(startedAt) < now ) || !!endedAt;
  });

  const upcomingCalls = calls?.filter(({state: {startedAt} } : Call) => {
    return ( startedAt && new Date(startedAt) < now)
    });
 const liveCalls = calls?.filter(({state: {startedAt, endedAt} } : Call) => {
    return ( startedAt && new Date(startedAt) < now ) && !endedAt
    });


    return { calls, isLoading, endedCalls, upcomingCalls, liveCalls };
};
export default useGetCalls;