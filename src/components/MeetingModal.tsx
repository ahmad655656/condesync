import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Button } from './ui/button';
import useMeetingActions from '@/hooks/useMeetingActions';


interface MeetingModalProps{
    isOpen: boolean;
    onClose: () => void;
    title: string;
    isJoinMeeting: boolean;
}
const MeetingModal = ({ isOpen, onClose, title, isJoinMeeting } : MeetingModalProps) => {
    const [meetingUrl, setMeetingUrl] = useState("");
    const { createInstanMeeting, joinMeeting } = useMeetingActions()
    const handleStart = () => {
        // if it's a full URL extract meeting ID
        if (isJoinMeeting) {
            const meetingId = meetingUrl.split("/").pop()
            if (meetingId) {
                joinMeeting(meetingId)
            }
        }else{
            createInstanMeeting()

        }
        setMeetingUrl("")
        onClose();
    }
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px]  ">
            <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            </DialogHeader>

            <div className='space-y-4 pt-4'>
                {isJoinMeeting && (
                    <Input placeholder='Past meeting link' value={meetingUrl} onChange={(e) => setMeetingUrl(e.target.value)} />
                )}
                <div className='flex justify-end gap-3'>
                    <Button variant={"outline"} onClick={onClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleStart} disabled={isJoinMeeting && !meetingUrl.trim()}>
                        {isJoinMeeting ? "Join Meeting" : "Start Meeting"}
                    </Button>
                </div>
            </div>
        </DialogContent>
    </Dialog>
  )
}

export default MeetingModal