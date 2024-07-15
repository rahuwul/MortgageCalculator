import React, { useState } from "react";
import DropArrow from "./assets/DropArrow";
import { StyleSheet, View, Keyboard } from "react-native";
import {
  Box,
  Button,
  VStack,
  Input,
  Text,
 
  NativeBaseProvider,
} from "native-base";
import DatePicker from 'react-native-date-picker';


const CalculatorScreen: React.FC = () => {
  const [startAmount, setStartAmount] = useState<string>("");
  const [interestRate, setInterestRate] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [result, setResult] = useState<number>(0);
  const [date, setDate] = useState<Date>(new Date());
  const [open, setOpen] = useState<boolean>(false);
  const [start, setStart] = useState(true);

  const validateInput = (value: string, isInteger = false): string => {
    let amt = value.replace(/[^0-9.]/g, "");
    if (isInteger) {
      amt = amt.replace(/\./g, "");
    } else {
      let decimalCount = 0;
      for (let i = 0; i < amt.length; i++) {
        if (amt[i] === ".") {
          decimalCount++;
          if (decimalCount > 1) {
            amt = amt.slice(0, i) + amt.slice(i + 1);
          }
        }
      }
    }
    return amt;
  };

  const calculateMortgage = () => {
    Keyboard.dismiss();
    if (parseFloat(interestRate) > 0) {
      let amt =
        parseFloat(startAmount) *
        Math.pow(1 + parseFloat(interestRate) / 100,2 );
      setResult(parseFloat(amt.toFixed(2)));
    }
  };
  const formatDate = (date: Date): string => {
    
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-indexed
    const year = date.getFullYear();
  
    
    return `${day}-${month}-${year}`;
  };
  const handleStartDate=()=>{
     setStart(true);
     setOpen(true); 
    }
  const handleEndDate=()=>{
     setStart(false);
     setOpen(true); 
    }


  return (
    <NativeBaseProvider>
      <Box style={styles.screen}>
        <VStack space={4} style={styles.content}>
          <Input
            placeholder="Original Amount"
            style={styles.input}
            keyboardType="number-pad"
            maxLength={10}
            value={startAmount}
          />
          <Input
            placeholder="Interest Rate %"
            style={styles.input}
            keyboardType="number-pad"
            maxLength={10}
            
            value={interestRate}
          />
          <View style={styles.dateContainer}>
            <Input
              placeholder="Start Date"
              style={styles.dateInput}
              keyboardType="number-pad"
              maxLength={10}
              value={startDate}
            />
            <Button style={styles.dateButton} onPress={()=>handleStartDate()}>
            <DropArrow/>
            </Button>
          </View>
          <View style={styles.dateContainer}>
            <Input
              placeholder="End Date"
              style={styles.dateInput}
              keyboardType="number-pad"
              maxLength={10}
              value={endDate}
            />
            <Button style={styles.dateButton} onPress={()=>handleEndDate()}>
            <DropArrow/>
            </Button>
          </View>
          <DatePicker
            modal
            mode="date"
            open={open}
            date={date}
            onConfirm={(date) => {
              setOpen(false);
              setDate(date);
              const formattedDate=formatDate(date);
              start?setStartDate(formattedDate):setEndDate(formattedDate);
            
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />

          <Button onPress={calculateMortgage}>
            <Text style={styles.buttonText}>Calculate</Text>
          </Button>
        </VStack>
        {result > 0 && (
          <Box>
            <Text>
              {startAmount} invested for  years, with a compounded
              annual interest rate of {interestRate}%, would yield:
            </Text>
            <Text>{result}</Text>
          </Box>
        )}
      </Box>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginTop: 40,
    marginBottom: 20,
    marginHorizontal: 50,
    alignItems: "center",
  },
  heading: {
    paddingVertical: 20,
    textAlign: "center",
  },
  text: {
    paddingVertical: 20,
    textAlign: "center",
  },
  content: {
    width: "80%",
  },
  input: {
    textAlign: "center",
  },
  buttonText: {
    textAlign: "center",
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateInput: {
    flex: 1,
    textAlign: "center",
  },
  dateButton: {
    marginLeft: 10,
    height: 40,
  },
});

export default CalculatorScreen;
