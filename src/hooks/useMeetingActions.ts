import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast"
const useMeetingActions = () => {
    const router = useRouter();
    const client = useStreamVideoClient();
    const createInstanMeeting = async () => {
        if (!client) {
            return
        }
        try {
            const id = crypto.randomUUID()
            const call = client.call("default", id)

            await call.getOrCreate({
                data: {
                    starts_at: new Date().toISOString(),
                    custom: {
                        description: "Instan Meeting",
                    },
                }
            })
            router.push(`/meeting/${call.id}`)
        } catch (error) {
            console.log(error);
            toast.error("Failed to create meeting")
        }
    }
    const joinMeeting = (callId: string) => {
        if(!client) return toast.error("Failed to join meeting. please try again.");
        router.push(`/meeting/${callId}`);
    };
    return { createInstanMeeting, joinMeeting };
}
export default useMeetingActions;