import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FAQ from "./FAQ/FAQ";
import LiveChat from "./LiveChat/LiveChat";
import useAuth from "@/hooks/useAuth";
import { Link, useParams } from "react-router-dom";

const HelpAndSupport = () => {
  const { user_info_DB } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { x } = useParams();
  // const isAdmin =
  // user?.email
  // // "admin@example.com"
  // === "admin@example.com";

  return (
    <section className="max-w-4xl mx-auto mt-10 p-5">
      <Tabs
        defaultValue={x === "live-chat" ? "live-chat" : "faq"}
        className="w-full"
      >
        <TabsList className="flex justify-center mb-4 py-5">
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="live-chat">Live Chat</TabsTrigger>
          {user_info_DB.role === "customer" &&<TabsTrigger value="order-issues">Order Issues & Returns</TabsTrigger>}
          <TabsTrigger value="account-security">Account & Security</TabsTrigger>
        </TabsList>

        {/* FAQ */}
        <TabsContent value="faq">
          <FAQ role={user_info_DB.role}></FAQ>
        </TabsContent>

        {/* live chat  */}
        <TabsContent value="live-chat">
          <div>
            <div className="-[500px] m-auto space-y-3">
              <span className="text-sm">
                <strong>Support Hours:</strong> (9 AM - 6 PM, Monday to Friday)
              </span>

              <LiveChat />

              {/* <div>{isAdmin ? <AdminPanel /> : <ChatRoom user={user} />}</div> */}
              {/* <hr /> */}
              {/* <h2>Admin Panel</h2> */}
              {/* <ChatComponent userType="Admin" email={'wwwrafikhan075@gmail.com'}/> */}
            </div>
          </div>
        </TabsContent>

        {/* Order Issues & Returns */}
        <TabsContent value="order-issues">
          <Card>
            <CardHeader>
              <CardTitle>Request a Refund</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Follow these steps to request a refund:
              </p>
              <ul className="list-disc pl-5 mt-2 text-sm">
                <li>Go to your order history</li>
                <li>Select the order you want to return</li>
                <li>Click &quot;Request a Refund&quot; and provide details</li>
                <li>Wait for approval from our team</li>
              </ul>
              <Button className="mt-4">Request Refund</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Account & Security */}
        <TabsContent value="account-security">
          <Card>
            <CardHeader>
              <CardTitle>Managing personal information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                You can manage your personal information such as name, email,
                and password from your account settings. Ensure your information
                is up-to-date to keep your account secure.
              </p>
              <Button className="mt-4">
                <Link to="/dashboard/my-account">Manage Info</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="mt-5">
            <CardHeader>
              <CardTitle>Reset Password</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Enter your email to receive a password reset link.
              </p>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2"
              />
              <Button className="mt-4">Send Reset Link</Button>
            </CardContent>
          </Card>

          <Card className="mt-5">
            <CardHeader>
              <CardTitle>Update Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Update your account details securely.
              </p>
              <Input
                type="password"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2"
              />
              <Button className="mt-4">Update Info</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default HelpAndSupport;
