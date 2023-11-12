import {Line} from "react-chartjs-2";
import {CategoryScale} from 'chart.js';
import Chart from "chart.js/auto";
Chart.register(CategoryScale);
const TestChaet = () => {
    const config = {
        type: 'line',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                label: 'My First Dataset',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        },
        options: {
            plugins: {
                zoom: {
                    zoom: {
                        wheel: {
                            enabled: true,
                        },
                        pinch: {
                            enabled: true
                        },
                        mode: 'xy',
                    }
                }
            }
        }
    };
    return <Line {...config} />
}
export default  TestChaet

export async function getServerSideProps(context) {
    const { req } = context;
    const cookies = req.headers.cookie;

    // Check if cookies are present
    if (cookies) {
        // Parse the cookies
        const parsedCookies = cookies.split(';').reduce((acc, cookie) => {
            const [key, value] = cookie.trim().split('=');
            acc[key] = decodeURIComponent(value);
            return acc;
        }, {});
        return {
            props: {
                // Pass the cookies as props to the component
                cookies: parsedCookies,
            },
        };
    }

    return {
        redirect: {
            permanent: false,
            destination: "/auth"
        }
    };
}