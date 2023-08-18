import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
        name: "Credentials",
        credentials: {
            email : { 
                label: "Email",
                type: "email",
            },
            password: { 
                label: "Password",
                type: "password"
            }
        },
        async authorize(credentials, req) {
            const data = {
                email: credentials.email,
                passwordText: credentials.password
            }

            const res = await fetch("http://localhost:3000/api/iniciarSesion",{
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            });
            const resultado = await res.json();
            if(resultado === false) throw new Error("Invalid credentials");
            
            return resultado;
        }
    }),
  ],
  callbacks: {
    async jwt({ account, token, user, profile, session }) {
        if(user) token.user = user;
        //console.log(token);
        return token;
    },
    async session({ session, token }) {
        //console.log(session, token)
        return session;
    }
  },
  /*pages: {{
    signIn: "/iniciar-sesion"
  }}*/
}

export default NextAuth(authOptions);