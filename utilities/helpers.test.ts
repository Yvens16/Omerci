import { validateEmail } from "./helpers";

test('validateEmail', () => {
  const invalidEmails = [
    "mysite.ourearth.com",//[@is not present]
    "mysite@.com.my",//[ tld (Top Level domain) can not start with dot "." ]
    "@you.me.net",//[No character before @ ]
    "mysite123@gmail.b",//[".b" is not a valid tld]
    "mysite@.org.org",//[tld can not start with dot "." ]
    ".mysite@mysite.org",//[an email should not be start with "." ]
    "mysite()*@gmail.com",//[here the regular expression only allows character, digit, underscore, and dash]
    "mysite..1234@yahoo.com"]//[double dots are not allowed]
  invalidEmails.forEach(email => {
    expect(validateEmail(email)).toBeNull();
  })
  expect(validateEmail("myemail@gmail.com")).not.toBeNull();
});