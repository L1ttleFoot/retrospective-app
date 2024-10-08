export default function Thumb({fill}: {fill?: string}) {
    return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill={fill}>
            <rect height="10" rx="1" width="3.99" x="2" y="10" />
            <path d="M8,17.82a2,2,0,0,0,1,1.75l1.68.93a3.05,3.05,0,0,0,1.66.5h7.26a1,1,0,0,0,1-.8L22,12.39A2,2,0,0,0,20,10H14V5a1,1,0,0,0-1-1H12.3a2,2,0,0,0-1.83,1.21L8.23,10.43A3,3,0,0,0,8,11.61Z" />
        </svg>
    );
}
