import styled from "styled-components";
import { device } from "../helpers/mediaQueries";
export const UserProfilePageContainer = styled.section`
  display: flex;
  justify-content: center;
  @media ${device.tablet} {
    align-items: center;
  }
`;

export const UserProfileComponentContainer = styled.div`
  width: 300px;
  height: 650px;
  background: hsl(210, 20%, 25%);
  border-radius: 10px;
  display: grid;
  margin: 40px 0;
  justify-items: center;
  grid-template-rows: repeat(5, auto);
  @media ${device.tablet} {
    grid-template-rows: repeat(3, 1fr);
    grid-template-columns: repeat(2, 1fr);
    height: 500px;
    width: 500px;
  }
`;
export const FormItemContainer = styled.div`
  grid-column: ${props => props.column};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 104px;
  width: auto;
  align-items: center;
  color: hsl(216, 33%, 97%);
`;
export const FormItemLabel = styled.label`
  align-self: baseline;
  padding-bottom: 10px;
`;
export const FormItemInput = styled.input`
  padding-left: 5px;
  border: none;
  border-radius: 4px;
  height: 31px;
  background: hsl(211, 12%, 42%);
  color: hsl(216, 33%, 97%);
  box-shadow: 0 4px 6px hsla(0, 0%, 0%, 0.25);
`;
export const FormItemTextArea = styled.textarea`
  padding-top: 5px;
  padding-left: 5px;
  border: none;
  border-radius: 4px;
  background: hsl(211, 12%, 42%);
  color: hsl(216, 33%, 97%);
  box-shadow: 0 4px 6px hsla(0, 0%, 0%, 0.25);
  resize: none;
`;

// router.post("/updateUsers", async(req, res) => {
//     const {name, profilePic, bio, user}= req.body
//     const userProfile = await User.findOne({_id: user.id})
//     if(name){
//         userProfile.name = name
//     }
//      if(profilePic){
//         userProfile.profilePic = profilePic
//     }
//     if(bio){
//         user.bio = bio
//     }
//     userProfile.save()
// })
