import React, { useState } from "react";
import { StyleSheet, View, Keyboard } from "react-native";
import {
  Box,
  Button,
  VStack,
  Input,
  Text,
  Heading,
  NativeBaseProvider ,
} from "native-base";

const CalculatorScreen: React.FC = () => {
  const [startAmount, setStartAmount] = useState<string>("");
  const [interestRate, setInterestRate] = useState<string>("");
  const [yearsInvested, setYearsInvested] = useState<string>("");
  const [result, setResult] = useState<number>(0);

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

  const startAmountHandler = (startAmount: string) => {
    setStartAmount(validateInput(startAmount));
  };

  const interestRateHandler = (interestRate: string) => {
    setInterestRate(validateInput(interestRate));
  };

  const yearsInvestedHandler = (yearsInvested: string) => {
    setYearsInvested(validateInput(yearsInvested, true));
  };

  const calculateCompoundInterest = () => {
    Keyboard.dismiss();
    if (parseFloat(interestRate) > 0) {
      let amt =
        parseFloat(startAmount) *
        Math.pow(1 + parseFloat(interestRate) / 100, parseInt(yearsInvested));
      setResult(parseFloat(amt.toFixed(2)));
    }
  };

  const resetInputHandler = () => {
    setStartAmount("");
    setInterestRate("");
    setYearsInvested("");
  };

  return (
    <NativeBaseProvider>
    <Box style={styles.screen}>
      <Heading style={styles.heading}>Calculate total</Heading>
      <Text style={styles.text}>
        Enter the amount invested, the annual interest rate percentage, and the
        number of years that the funds will be invested.
      </Text>
      <VStack space={4} style={styles.content}>
        <Input
          placeholder="Amount invested"
          style={styles.input}
          keyboardType="number-pad"
          maxLength={10}
          onChangeText={startAmountHandler}
          value={startAmount}
        />
        <Input
          placeholder="Interest Rate % per year"
          style={styles.input}
          keyboardType="number-pad"
          maxLength={10}
          onChangeText={interestRateHandler}
          value={interestRate}
        />
        <Input
          placeholder="Number of years funds invested"
          style={styles.input}
          keyboardType="number-pad"
          maxLength={10}
          onChangeText={yearsInvestedHandler}
          value={yearsInvested}
        />
        <Button onPress={calculateCompoundInterest}>
          <Text style={styles.buttonText}>Calculate</Text>
        </Button>
      </VStack>
      {result > 0 && (
        <Box>
          <Text>{startAmount} invested for {yearsInvested} years, with a compounded annual interest rate of {interestRate}%, would yield:</Text>
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
});

export default CalculatorScreen;
