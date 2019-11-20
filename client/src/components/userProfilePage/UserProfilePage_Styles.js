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
  display: flex;
  background: hsl(210, 20%, 25%);
  border-radius: 10px;
  margin: 40px 0;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  @media ${device.tablet} {
    display: grid;
    grid-template-rows: repeat(4, 1fr);
    grid-template-columns: repeat(2, 1fr);
    height: 550px;
    width: 500px;
    justify-items: center;
  }
`;
export const ProfilePictureSelectContainer = styled.div``;
export const ProfilePictureSelectLabel = styled.label`
  cursor: pointer;
  color: hsl(216, 33%, 97%);
`;
export const ProfilePictureSelectInput = styled.input`
  display: none;
`;
export const FormItemContainer = styled.div`
  grid-column: ${props => props.column};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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
  border: 1px;
  border-radius: 4px;
  height: 31px;
  background: hsl(211, 12%, 42%);
  color: hsl(216, 33%, 97%);
  box-shadow: 0 4px 6px hsla(0, 0%, 0%, 0.25);
  transition: all 0.5s ease;
  :focus {
    border: 1px solid hsl(211, 15%, 91%);
    background: hsl(209, 13%, 29%);
    box-shadow: none;
  }
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
  width: 250px;
  transition: all 0.5s ease;
  :focus {
    border: 1px solid hsl(211, 15%, 91%);
    background: hsl(209, 13%, 29%);
    box-shadow: none;
  }
  @media ${device.tablet} {
    width: auto;
  }
`;
export const UpdateProfileButton = styled.button`
  justify-self: end;
  align-self: end;
  grid-column: 2;
  margin-right: 10px;
  margin-bottom: 10px;
  margin-left: auto;
  background: hsl(262, 82%, 60%);
  border: none;
  height: 30px;
  width: 100px;
  border-radius: 10px;
  color: hsl(216, 33%, 97%);
  cursor: pointer;
  transition: all 0.2s ease;
  :hover {
    transform: translateY(-3px);
  }
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
