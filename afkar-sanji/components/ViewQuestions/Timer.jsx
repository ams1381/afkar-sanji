import { TimerContainer } from '@/styles/questionnairePanel/ViewQuestions';
import { digitsEnToFa } from '@persian-tools/persian-tools';
import React from 'react'
import { useTimer } from 'react-timer-hook';

export const Timer = ({ expiryTimestamp }) => {
    const {
        seconds,
        minutes,
        hours,
      } = useTimer({ expiryTimestamp, onExpire: () => SetTimerFinished(true) });
    return (
        <TimerContainer>
            {hours < 10 ? <span>{digitsEnToFa(0)}{digitsEnToFa(hours)}</span> : <span>{digitsEnToFa(hours)}</span> }:
            {minutes < 10 ? <span>{digitsEnToFa(0)}{digitsEnToFa(minutes)}</span> : <span>{digitsEnToFa(minutes)}</span>}:
            {seconds < 10 ? <span>{digitsEnToFa(0)}{digitsEnToFa(seconds)}</span> : <span>{digitsEnToFa(seconds)}</span>}
        </TimerContainer>
      );
}
