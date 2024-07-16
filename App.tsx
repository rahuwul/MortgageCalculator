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
    
    const [day1, month1, year1] = startDate.split('-').map(Number);
    const [day2, month2, year2] = endDate.split('-').map(Number);

    // Calculate the total number of months from the start year and month
    let totalMonths = (year2 - year1) * 12 + (month2 - month1);

    // Calculate remaining days assuming each month has 30 days
    let remainingDays = day2 - day1;

    if (remainingDays < 0) {
        totalMonths -= 1;
        remainingDays += 30; // Add 30 days from the previous month
    }
    
    const totalDays=totalMonths*30+remainingDays;
    
    // Convert startAmount and interestRate to numbers
    const principal = parseFloat(startAmount);
    const rate = parseFloat(interestRate);

    // Simple interest calculation for example (use actual formula based on requirements)
    const interest = principal * (rate / 3000) * (totalDays);

    setResult(principal + interest);
  };

  const formatDate = (date: Date): string => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-indexed
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
      <Box style={styles.screen}>
        <VStack space={4} style={styles.content}>
          <Input
            placeholder="Original Amount"
            style={styles.input}
            keyboardType="number-pad"
            maxLength={10}
            value={startAmount}
            onChangeText={text => setStartAmount(validateInput(text))}
          />
          <Input
            placeholder="Interest Rate %"
            style={styles.input}
            keyboardType="number-pad"
            maxLength={5}
            value={interestRate}
            onChangeText={text => setInterestRate(validateInput(text))}
          />
          <View style={styles.dateContainer}>
            <Input
              placeholder="Start Date"
              style={styles.dateInput}
              keyboardType="number-pad"
              maxLength={10}
              value={startDate}
              editable={false}
            />
            <Button style={styles.dateButton} onPress={handleStartDate}>
              <DropArrow />
            </Button>
          </View>
          <View style={styles.dateContainer}>
            <Input
              placeholder="End Date"
              style={styles.dateInput}
              keyboardType="number-pad"
              maxLength={10}
              value={endDate}
              editable={false}
            />
            <Button style={styles.dateButton} onPress={handleEndDate}>
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
          <Button onPress={calculateMortgage}>
            <Text style={styles.buttonText}>Calculate</Text>
          </Button>
        </VStack>
        {result > 0 && (
          <Box>
            <Text>
              {startAmount} invested from {startDate} to {endDate}, with a 
              annual interest rate of {interestRate}%, would yield:
            </Text>
            <Text>{result.toFixed(2)}</Text>
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
  content: {
    width: "80%",
  },
  input: {
    textAlign: "center",
  },
  buttonText: {
    textAlign: "center",
    color: "white",
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
