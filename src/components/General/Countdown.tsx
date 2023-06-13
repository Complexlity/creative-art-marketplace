import Countdown, { zeroPad} from 'react-countdown'


type Renderer = {
  hours: number,
  minutes: number,
  seconds: number,
  completed: boolean
}
//@ts-ignore
let renderer = ({ days, hours, minutes, seconds, completed }: Renderer) => {
  hours += days * 24
  const Completionist = () => <span className="text-green-500">NIL</span>;
  if (completed) {
    // Render a completed state
  return <Completionist />;
} else {
  // Render a countdown
    return <span suppressHydrationWarning={true}>{zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}</span>;
}
};

export default function CountDownComponent({ timeDifference }: { timeDifference: number }) {

  return <Countdown date={Date.now() + timeDifference} renderer={renderer} daysInHours/>
}

