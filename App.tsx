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

  const [date, setDate] = useState<Date>(new Date());
  const [open, setOpen] = useState<boolean>(false);
  const [start, setStart] = useState<boolean>(true);

  const [interestPM, setInterestPM] = useState<number>(0);
  const [daysRemaining, setDaysRemaining] = useState<number>(0);
  const [monthsTotal, setMonthsTotal] = useState<number>(0);

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

    let [day1, month1, year1] = startDate.split('-').map(Number);
    let [day2, month2, year2] = endDate.split('-').map(Number);

    if (day1 === 31 && day2 !== 31) {
      day1 -= 1;
    }
    if ((day1 === 28 || day1 === 29) && (month1 === 2)) {
      day1 = 30;
    }
    
    let totalMonths = (year2 - year1) * 12 + (month2 - month1);
    let remainingDays = day2 - day1;

    if (remainingDays < 0) {
      totalMonths -= 1;
      remainingDays += 30;
    }

    const totalDays = totalMonths * 30 + remainingDays;
    const principal = parseFloat(startAmount);
    const rate = parseFloat(interestRate);
    const interestPerMonth = principal * (rate / 100);
    const interest = (interestPerMonth / 30) * (totalDays);

    setInterestPM(interestPerMonth);
    setDaysRemaining(remainingDays);
    setMonthsTotal(totalMonths);
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
              theme="dark"
              buttonColor="#FFD700"
              dividerColor="#FFD700"
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
        </Box>
        {result > 0 && (
          <Box>
            <Box style={styles.resultBox}>
              <Text style={styles.resultText}>
                Net Amount
              </Text>
              <Text style={styles.resultMainText}>
                {result.toFixed(2)}
              </Text>
            </Box>
            <Box style={styles.resultBox}>
              <Text style={styles.resultText}>
                Interest Per Month
              </Text>
              <Text style={styles.resultMainText}>
                {interestPM}
              </Text>
            </Box>
            <Box style={styles.resultBox}>
              <Text style={styles.resultText}>
                Interest Per Day
              </Text>
              <Text style={styles.resultMainText}>
                {interestPM / 30}
              </Text>
            </Box>
            <Box style={styles.resultBox}>
              <Text style={styles.resultText}>
                Duration
              </Text>
              <Text style={styles.resultMainText}>
                {monthsTotal}months {daysRemaining}days = {monthsTotal * 30 + daysRemaining} days
              </Text>
            </Box>
          </Box>
        )}
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
    paddingHorizontal: 4,
    backgroundColor: "#3B3B3B",
    fontFamily: "Montserrat-Medium",
    fontSize: 14,
    color: "#FFD700",
  },
  dateInputContainer: {
    backgroundColor: "#3B3B3B",
    flexDirection: 'row',
    alignItems: 'center',

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
    marginTop: -10,
    marginBottom: 20,
  },
  btnText: {
    fontFamily: "Montserrat-Bold",
    fontSize: 16,
  },
  resultBox: {
    backgroundColor: "#3B3B3B",
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginVertical: 5,
    display: "flex",
    justifyContent: "center",
    borderRadius: 10,
  },
  resultText: {
    marginBottom: -15,
    fontFamily: "Montserrat-Regular",
    fontSize: 12,
    color: "#FFD700",
  },
  resultMainText: {

    paddingTop: 20,
    fontFamily: "Montserrat-Bold",
    fontSize: 18,
    color: "#FFD700",
  },
});

export default CalculatorScreen;
