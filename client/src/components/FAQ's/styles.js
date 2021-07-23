import styled from "styled-components";

export const StyledFAQs = styled.div`
    width: 80%;
    margin: 50px auto;
    padding: 10px 20px;
    border: 1px solid black;
    background-color: #30475e;
    color: #e8e8e8;
    display: flex;
    flex-direction: column;
    & > h1 {
        line-height: 0;
        margin: 50px;
        align-self: center;
    }
    border-radius: 2.5%;
`;

export const StyledQuestion = styled.div`
    position: relative;
    margin: 5px 0;
    padding: 2px 25px;
    border: 1px solid #293949;
    background: #293949;
    line-height: .7;
    border-radius: 50px 100px 50px 100px / 25px 50px 25px 50px;
    h2{
        margin-bottom: 25px;
    }
`;



export const StyledAnswer = styled.div`
    margin-bottom: 20px;
    padding: 0 15px;
    /* display: none; */
    `;

export const BtnLarge = styled.button`
    font-family: Questrial;
    font-size: 20px;
    height: 50px;
    border: none;
    border-radius: 50px 100px 50px 100px / 25px 50px 25px 50px;
    h2{
        margin-bottom: 25px;
    }
    box-shadow: 
    inset 2px 3px 5px rgba(0, 0, 0, 0.3),
    inset -2px -3px 5px rgba(0, 0, 0, 0.5);
    background-color: #ea5455;
    
    &:hover {
        background-color: #e5e5e5;
        box-shadow: 
        inset -2px -3px 5px rgba(0, 0, 0, 0.3),
        inset 2px 3px 5px rgba(0, 0, 0, 0.5);
    }
    `;

export const Styledform = styled.form`
       
       position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        margin: 5px 0;
        padding: 2px 25px;
        border: 1px solid #293949;
        background: #293949;
        line-height: .7;
        border-radius: 50px 100px 50px 100px / 25px 50px 25px 50px;
        h2{
            margin-bottom: 25px;
        }
        `;

export const InputForm= styled.input`
    text-align: center;
    margin: 15px 0;
    height: 25px;
    border-radius: 50px 100px 50px 100px / 25px 50px 25px 50px;
    h2{
        margin-bottom: 25px;
    }
    `
export const TextForm= styled.textarea`
    text-align: center;
    padding: 50px;
    margin: 10px 0;
    height: 70px;
    border-radius: 50px 100px 50px 100px / 25px 50px 25px 50px;
    h2{
        margin-bottom: 25px;
        }
`
 export const Btn = styled.button`
    margin-left: 30rem ;
    align-items: center;
    font-family: Questrial;
    font-size: 20px;
    height: 50px;
    width: 135px;
    border: none;
    border-radius: 10px;
    box-shadow: 
       inset 2px 3px 5px rgba(0, 0, 0, 0.3),
       inset -2px -3px 5px rgba(0, 0, 0, 0.5);
    background-color: #ea5455;
            
    &:hover {
        background-color: #e5e5e5;
        box-shadow: 
           inset -2px -3px 5px rgba(0, 0, 0, 0.3),
           inset 2px 3px 5px rgba(0, 0, 0, 0.5);
        }
  `;