# People-On-Mobile

This is a simple app that displays a list of users from a JSON file (https://6799ee3d747b09cdcccd06bc.mockapi.io/api/v1/users)

## How to run

1. Clone the repository
2. Run `npm install`
3. Run `npx expo start`

You will see a QR code in the terminal. Scan the QR code with your phone to run the app, or you can run the app on your web browser to see it in action.

## How to test

You can test the app by running the app on your phone or web browser.

There are two pickers in the app, the first one is for sorting the users by creation time, and the second one is for filtering the users by country, and there is also an input for the page size (default is 20). For the search input, you can search by the user name, and the search will be case insensitive! Try it all out :)

If there are multiple pages of users, you can also test the pagination by clicking on the page number at the bottom of the screen.

Hopefully you enjoy testing the app!

# Challenges Faced

# Project Challenges & Solutions

## Technical Challenges

1. **Search Implementation**
   - Challenge: The default React Native search functionality offered limited customization options
   - Solution: Implemented a custom search using the `TextInput` component, allowing for better control over styling and behavior

2. **Pagination Implementation**
   - Challenge: Initially attempted to handle pagination solely through `FlatList`
   - Solution: Integrated `ScrollView` with `FlatList` to achieve smooth pagination functionality
   - Learning: While `FlatList` is great for rendering lists, combining it with `ScrollView` provided better control over page navigation

3. **useEffect Hook Issues**
   - Challenge: Encountered issues where useEffect hooks were not triggering as expected
   - Solution: Referenced a working implementation from another project to resolve the issue
   - Learning: This highlighted the importance of maintaining reference implementations and proper useEffect dependency management

4. **Dropdown Picker Implementation**
   - Challenge: The default Picker component in React Native was working on my web browser, but not on my phone no matter what styling I did
   - Solution: Utilized `react-native-dropdown-picker` to implement a fully functional dropdown picker
   - Learning: This highlighted the importance of being flexible and realizing the important of testing on my phone :)
 
 5. **Keyboard Avoiding View**
   - Challenge: The dropdown picker was not working because the keyboard was covering the dropdown picker
   - Solution: Utilized `KeyboardAvoidingView` to avoid the keyboard from covering the dropdown picker
   - Learning: Realizing that a lot of components in React Native need a more mobile friendly alternative