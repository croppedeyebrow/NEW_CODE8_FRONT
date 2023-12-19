import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import MainAxios from "../../axios/MainAxios";

const Container = styled.div`
  /* border: 3px solid black; */
  height: 80%;
  width: 100%;
  margin-top: 3%;
`;

const Contents = styled.div`
  /* border: 3px solid gray; */
  width: 100%;
  height: 45vh;
`;

const Content = styled.div`
  /* border: 3px solid green; */
  border-radius: 20px;
  margin: 0 auto;
  width: 90%;
  height: 90%;
  background-image: ${(props) => `url(${props.imagePath})`};
  /* background-color: green; */
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  cursor: pointer;
  color: gray;
`;

// 좌우 이동 arrow 스타일 지정
const Custom = styled.div`
  /* border: 3px solid red; */
  background-color: red; /* 배경색 지정 */
`;

const CatouselSlider = () => {
  const usenavigate = useNavigate();
  // 백엔드의 리스트 데이터 저장
  const [list, setList] = useState([]); // 상태로 list 선언

  // 해당 링크로 이동
  const onClick = (id) => {
    // 임시
    usenavigate(`/music-info/${id}`);
  };

  // 리스트 : 백엔드에서 가져올것.
  useEffect(() => {
    const getList = async () => {
      const res = await MainAxios.notLoginList();
      console.log("리스트 데이터", res);
      if (res.status === 200) {
        // 내림차순으로 정렬
        const sortedList = res.data
          .slice()
          .sort((a, b) => b.musicDTO.purchaseCount - a.musicDTO.purchaseCount);
        setList(sortedList);
        console.log("list = res.data", sortedList);
      }
    };
    getList();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <Custom />,
    prevArrow: <Custom />,
  };

  return (
    <Container>
      <Slider {...settings}>
        {list.map((data, index) => (
          <Contents key={index}>
            <Content
              onDoubleClick={() => onClick(data.musicDTO.id)}
              imagePath={data.musicDTO.thumbnailImage}
            >
              <p>판매량 : {data.musicDTO.purchaseCount}</p>
              <p>제목 : {data.musicDTO.musicTitle}</p>
              <p>가수 : {data.userResDto.userNickname}</p>
            </Content>
          </Contents>
        ))}
      </Slider>
    </Container>
  );
};
export default CatouselSlider;
