import styled from 'styled-components';
export const SpinnerStyle = styled.div`
.box .percent svg circle:nth-child(2){
    stroke-dashoffset: calc(440 - (440 * ${props => props.percent} )/100);
}
`;