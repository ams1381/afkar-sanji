import Image from "next/image";
import { useRouter } from "next/router";
// style component
import {
  AfterBox,
  Container,
  ImageWallpaper,
  QuestionBox,
  Header,
  RightHeader,
  LeftHeader,
} from "@/styles/questioner/questioner";
// icons
import closeIcon from "public/Icons/Dismiss.svg";
import arrowRightIcon from "public/Icons/Chevron Double.svg";
// image
import backGround from "@/public/Images/Group 1 1.png";
// data
import { liListData } from "@/utilities/data/questioner";
// ant design
import { Button } from "antd";
// motion
import { AnimatePresence, motion } from "framer-motion";

const Questioner = () => {
  const router = useRouter();
  return (
    <AnimatePresence>
      <motion.div
        transition={{ duration: 1 }}
        initial={{ y: 220 }}
        animate={{ y: 0 }}
      >
        <Container>
          <QuestionBox>
            <Header>
              <div>
              <RightHeader>
                <p>ثبت درخواست پرسشگری</p>
                <h2>با جمع‌آوری دیدگاه‌های مختلف کسب درآمد کنید!</h2>
              </RightHeader>
              <Button
                  style={{
                    marginTop:'108px',
                    display:'flex',
                    alignItems:'center',
                    gap:'5px'
                  }}
                  className={`bottom`}
                  onClick={() => router.push("/questioner/information")}
              >
                <img src={arrowRightIcon?.src} />
                تکمیل اطلاعات
              </Button>
              </div>
              <LeftHeader>
                {liListData?.map((item) => (
                  <li key={item?.id}>
                    <img className={`icon`} src={item?.icon} alt="" />
                    <div className="text">{item?.text}</div>
                  </li>
                ))}
              </LeftHeader>
            </Header>
            <AfterBox />

              <ImageWallpaper src={backGround?.src} alt={""} />

          </QuestionBox>

          <Image
            width={28}
            height={28}
            className={"close"}
            src={closeIcon?.src}
            alt={"بستن"}
            onClick={() => router.push('/')}
          />

        </Container>
      </motion.div>
    </AnimatePresence>
  );
};

export default Questioner;

export async function getServerSideProps(context) {
  const { req } = context;
  const cookies = req.headers.cookie;

  // Check if cookies are present
  if (cookies) {
    // Parse the cookies
    const parsedCookies = cookies.split(";").reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split("=");
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
      destination: "/auth",
    },
  };
}
