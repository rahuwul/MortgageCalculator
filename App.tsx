import React, { useState } from "react";
import DropArrow from "./assets/DropArrow";
import { View, Keyboard, StyleSheet } from "react-native";
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
  const [totalMonths, setTotalMonths] = useState<number>(0);
  const [totalDays, setTotalDays] = useState<number>(0);
  const [date, setDate] = useState<Date>(new Date());
  const [open, setOpen] = useState<boolean>(false);
  const [start, setStart] = useState<boolean>(true);
  const [interestPM,setInterestPM]=useState<number>(0);

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
    
    const [day1, month1, year1] = startDate.split('-').map(Number);
    const [day2, month2, year2] = endDate.split('-').map(Number);

    let totalMonths = (year2 - year1) * 12 + (month2 - month1);
    let remainingDays = day2 - day1;

    if (remainingDays < 0) {
        totalMonths -= 1;
        remainingDays += 30;
    }
    
    const totalDays = totalMonths * 30 + remainingDays;

    setTotalMonths(totalMonths);
    setTotalDays(totalDays);
    
    const principal = parseFloat(startAmount);
    const rate = parseFloat(interestRate);
    setInterestPM(principal*(rate/100));
    const interest = (interestPM/30) * (totalDays);

    setResult(principal + interest);
  };

  const formatDate = (date: Date): string => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    
    return `${day}-${month}-${year}`;
  };

  const handleStartDate = () => {
    setStart(true);
    setOpen(true); 
  }

  const handleEndDate = () => {
    setStart(false);
    setOpen(true); 
  }

  return (
    <NativeBaseProvider>
      <Box style={styles.body}>
        <Box style={styles.container}>
          <VStack space={4}>
            <Input
              placeholder="Original Amount"
              keyboardType="number-pad"
              maxLength={10}
              value={startAmount}
              style={styles.input}
              onChangeText={text => setStartAmount(validateInput(text))}
            />
            <Input
              placeholder="Interest Rate %"
              keyboardType="number-pad"
              maxLength={5}
              value={interestRate}
              style={styles.input}
              onChangeText={text => setInterestRate(validateInput(text))}
            />
            <View style={styles.dateInputContainer}>
              <Input
                placeholder="Start Date"
                keyboardType="number-pad"
                maxLength={10}
                value={startDate}
                editable={false}
                style={styles.dateInput}
              />
              <Button onPress={handleStartDate} style={styles.dropArrowButton}>
                <DropArrow />
              </Button>
            </View>
            <View style={styles.dateInputContainer}>
              <Input
                placeholder="End Date"
                keyboardType="number-pad"
                maxLength={10}
                value={endDate}
                editable={false}
                style={styles.dateInput}
              />
              <Button onPress={handleEndDate} style={styles.dropArrowButton}>
                <DropArrow />
              </Button>
            </View>
            <DatePicker
              modal
              mode="date"
              open={open}
              date={date}
              onConfirm={(date) => {
                setOpen(false);
                const formattedDate = formatDate(date);
                start ? setStartDate(formattedDate) : setEndDate(formattedDate);
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />
            <Button style={styles.btn} onPress={calculateMortgage}>
              <Text style={styles.btnText}>Calculate</Text>
            </Button>
          </VStack>
          {result > 0 && (
            <Box>
              <Box style={styles.resultBox}>
              <Text style={styles.resultText}>
                Net Amount
              </Text>
              <Text style={styles.resultText}>
                {result.toFixed(2)}
              </Text>
              </Box>
              <Box style={styles.resultBox}>
              <Text style={styles.resultText}>
                Interest Per Month
              </Text>
              <Text style={styles.resultText}>
                {interestPM}
              </Text>
              </Box>
              <Box style={styles.resultBox}>
              <Text style={styles.resultText}>
                Duration
              </Text>
              <Text style={styles.resultText}>
                {totalMonths} months {totalDays} days
              </Text>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: "#171717",
    flex: 1,
    alignItems: "center",
  },
  container: {
    width: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 40,
  },
  input: {
    fontFamily: "Montserrat-Medium",
    fontSize: 14,
    color: "#FFD700",
  },
  dateInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  dateInput: {
    flex: 1,
    fontFamily: "Montserrat-Medium",
    fontSize: 14,
    color: "#FFD700",
  },
  dropArrowButton: {
    marginLeft: 10,
    backgroundColor: "#FFD700",
  },
  btn: {
    backgroundColor: "#FFD700",
    marginTop:-20,
  },
  btnText: {
    fontFamily: "Montserrat-Bold",
    fontSize: 16,
  },
  resultBox:{
    backgroundColor:"grey",
    paddingHorizontal:10,
  },
  resultText: {
    paddingTop: 20,
    fontFamily: "Montserrat-Bold",
    fontSize: 18,
    color: "#FFD700",
  },
});

export default CalculatorScreen;
