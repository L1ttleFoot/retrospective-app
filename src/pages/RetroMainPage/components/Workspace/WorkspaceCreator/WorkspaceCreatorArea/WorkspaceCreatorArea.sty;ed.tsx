import styled from "styled-components";

export const Area = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.7);
    box-shadow: 0 4px 16px 0 rgba(61, 72, 108, 0.16), inset 0 -3px 28px 0 rgba(255, 255, 255, 0.4);
`

export const AreaHeaderInput = styled.input`
    display: block;
    width: 100%;
    height: 40px;
    padding: 20px 10px 0;
    font-family: 'PT Root UI', 'Roboto', Arial, sans-serif;
    font-weight: 400;
    font-size: 18px;
    line-height: 1.28;
    box-sizing: border-box;
    background-color: transparent;
    border: 0 solid transparent;
    border-bottom: 1px solid rgba(0,0,0,0.2);
    color: #3d486c;
    
    &:focus{
        outline: none;
    }
`

export const AreaHeaderTitle = styled.div`
    display: block;
    width: 100%;
    height: 40px;
    padding: 20px 10px 0;
    font-family: 'PT Root UI', 'Roboto', Arial, sans-serif;
    font-weight: 400;
    font-size: 18px;
    line-height: 1.28;
    box-sizing: border-box;
    color: #3d486c;
    text-align: center;
`

export const AreaHeader = styled.div`
    width: 100%;
    border-bottom: 1px solid rgba(0,0,0,0.2);
`

export const AreaBody = styled.div`
    
`

