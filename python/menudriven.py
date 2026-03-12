print("-Welcome to Menu driven program-")
print("1.Palindrome operation")
print("2.Armstrong operation")
print("3.Reverse operation")
print("4.Exit Program")
print()
print()
choice = int(input("Enter your choice: "))
while choice!=1 or choice!=2 or choice!=3 or choice!=4:
    print("WRONG CHOICE ENTERED")
    print("Enter choice again.")
    choice=int(input("Enter choice : "))
# nested loop for operations
if choice==1:
    print("-OPERATION SELECTED PALINDROME-")
    number = int(input("Enter a number: "))
    temp = number
    # reversing
    reverse = 0
    while temp!=0:
        remainder = temp%10
        reverse = reverse*10+remainder
        temp //=10
    # condition check
    if number==reverse:
        print(f"The number:{number} is palindrome")
    else:
        print(f"The number:{number} is not palindrome")
elif choice==2:
    print("-OPERATION SELECTED ARMSTRONG-")
    number = int(input("Enter a number: "))
    temp = number
    # counting digits
    digits= len(str(number))
    #checking sum for armstrong logic
    sum=0
    while temp>0:
        remainder = temp%10
        sum += remainder**digits
        temp//=10
    # is else for checking
    if sum==number:
        print(f"The number: {number} is Armstrong")
    else:
        print(f"The number: {number} is not Armstrong")
elif choice==3:
    print("-OPERATION SELECTED REVERSE-")
    number = int(input("Enter a number :"))
    # reverse
    reverse = 0
    while number!=0:
        remainder= number%10
        reverse = reverse*10+remainder
        number = number//10
    print(f"Reversed number is {reverse}")
elif choice==4:
    print("-Program EXITTED SUCCESFULLY-")

