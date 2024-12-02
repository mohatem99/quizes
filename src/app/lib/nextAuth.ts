import axios from "axios";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
const options: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          console.log("credentials", credentials);

          const { email, password } = credentials;
          const response = await axios.post(
            "https://exam.elevateegy.com/api/v1/auth/signin",
            { email, password }
          ); // Check if the response indicates success and contains user data
          if (response.status === 200 && response.data) {
            const { token, user } = response.data; // Adjust to match your API structure
            console.log("User authenticated:", user);
            // Return the user object including the token
            return { ...user, accessToken: token };
          } else {
            console.log("Login failed: Invalid credentials");
            return null; // Return null if authentication fails
          }
        } catch (error) {
          console.error(
            "Error during login:",
            error.response?.data || error.message
          );
          return null; // Return null on error}
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE__CLIENT_SCERET as string,
    }),
  ],
  //   callbacks: {
  //     async jwt({ token, user }) {
  //       // Include the accessToken from the user in the JWT
  //       if (user) {
  //         token.accessToken = user.accessToken; // Store the API-provided token
  //       }
  //       return token;
  //     },
  //     async session({ session, token }) {
  //       // Make the accessToken available in the session
  //       if (token) {
  //         session.user.accessToken = token.accessToken; // Pass the token to the session
  //       }
  //       return session;
  //     },
  //   },
  secret: process.env.NEXTAUTH_SECRET,
};

export default options;
