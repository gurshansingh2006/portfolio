number = int(input("Enter a number :"))
# reverse
reverse = 0
while number!=0:
    remainder= number%10
    reverse = reverse*10+remainder
    number = number//10
print(f"reversed number is {reverse}")