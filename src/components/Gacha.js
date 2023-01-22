import { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { UserContext } from '../contexts/UserContext';
import { RarityP, Units } from '../DropTable';
import { db } from '../firebase';
import { doc, setDoc, updateDoc, Timestamp } from 'firebase/firestore'
import HelpCenterIcon from '@mui/icons-material/HelpCenter';

// TEMP solution for images
import image1 from '../assets/stable_diffusion_jpg1.jpg';
import image2 from '../assets/stable_diffusion_jpg2.jpg';
import image3 from '../assets/stable_diffusion_jpg3.jpg';
import image4 from '../assets/stable_diffusion_jpg4.jpg';

const tempMapping = {
  '1': image4,
  '2': image3,
  '3': image1,
  '4': image2
}


function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}


function rollRarity() {
  let rn = getRandomInt(100);
  console.log("rn: ", rn);
  let total = 0;
  console.log("RarityP: ", Object.entries(RarityP));
  for (const [rarity, p] of Object.entries(RarityP)) {
    total += p * 100;
    console.log("total: ", total);
    if (rn < total) {
      console.log("picked rarity: ", rarity);
      return rarity;
    }
  }
  return Object.keys(RarityP)[0];
}

function rollUnit() {
  let units = Units[rollRarity()];
  while (units.length == 0) {
    units = Units[rollRarity()];
  }
  return units[Math.floor(Math.random() * units.length)];
}
  
  

export default function Gacha(props) {
  const { 
    user, 
    povertyPoints, setPovertyPoints, 
    premiumPoints, setPremiumPoints,
    roster, setRoster 
  } = useContext(UserContext);
  const [ rollResult, setRollResult ] = useState(null);

  const handleRoll = async (e) => {
    e.preventDefault();
    const unit = rollUnit();
    setRollResult(unit);
    
    
    // what needs to be done?
    // - check if user has unit
    // - if not, add unit to user's units
    try {
      // deduct currency
      await updateDoc(
        doc(db, "users", user.uid),
        { povertyPoints: povertyPoints - 100, premiumPoints: premiumPoints - 10 }
      );
      setPremiumPoints(premiumPoints - 10);
      setPovertyPoints(povertyPoints - 1000);
      console.log("set currency");

      // update roster
      let cpy = { ...roster };
      let isNewUnit = false;
      const rosterUnit = {
        id: unit.id,
        name: unit.name,
        imgFile: unit.imgFile,
        netWorth: 69,
        copies: 1
      };
      if (!(unit.id in roster)) {
        isNewUnit = true;
        cpy[unit.id] = rosterUnit;
      } else {
        cpy[unit.id].copies += 1;
      }
      console.log("created cpy: ", cpy);


      // update local copy
      setRoster(cpy);
      console.log("updated local roster");

      // update db
      if (isNewUnit) {
        console.log("setting doc on new roll");
        await updateDoc(
          // doc(db, "users", user.uid, "roster", `${unit.id}`), 
          // cpy
          doc(db, "users", user.uid),
          { 
            [`roster.${unit.id}`]: rosterUnit
          }
        );
      } else {
        console.log("updating doc on dupe roll");
        await updateDoc(
          // doc(db, "users", user.uid, "roster", `${unit.id}`),
          // { copies : cpy[unit.id].copies }
          doc(db, "users", user.uid),
          { 
            [`roster.${unit.id}.copies`]: cpy[unit.id].copies 
          }
        );
      }
    } catch (e) {
      console.log("Error on handleRoll:", e);
    }
  }

  return (
    <Dialog
      maxWidth="md"
      fullWidth={true}
      open={props.open}
      onClose={props.handleClose}
    >
      <DialogTitle>Roll Gacha</DialogTitle>
      <DialogContent>
        {/* <DialogContentText> */}
        {/*   Roll for new units! */}
        {/* </DialogContentText> */}
        <Box
          noValidate
          component="form"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            m: 'auto',
            width: 'fit-content',
          }}
        >
          {/* <Typography variant="h6" color="inherit" noWrap>
            Legitimate Vibeo Game
          </Typography> */}
          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            marginTop="5px"
          >
            <Chip label={`Poverty Points ${povertyPoints}`} />
            <Chip label={`Premium Points ${premiumPoints}`} variant="outlined" />
            <Button variant="contained" onClick={handleRoll}>
              Roll
            </Button>
          </Stack>
          <Stack 
            direction="row"
            justifyContent="center"
            margin="5px"
          >
            {
              rollResult 
              ? (<Stack direction="column" alignItems="center" >
                <img src={tempMapping[rollResult.id]} />
                <p>Congratulations you rolled: {rollResult.name}</p>
              </Stack>)
              : <HelpCenterIcon />
            }
          </Stack>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
