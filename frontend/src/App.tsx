import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { Field } from "./components/ui/field"
import {
  ButtonGroup,

} from "@/components/ui/button-group"
import {
  Card,

  CardContent,

  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


function App() {
  const { register, handleSubmit, reset } = useForm()

  const [response, setResponse] = useState("")

  async function onSubmit(data: any) {
    const res = await fetch("http://localhost:8000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: data.name,
      }),
    })

    const result = await res.json()

    setResponse(result.message || JSON.stringify(result))
    reset()
  }

  return (
    <div className=" min-h-screen flex items-center justify-center">
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>AI Chatbot</CardTitle>
      </CardHeader>
      <CardContent>
      <Card className="min-h-96">
        <CardContent>
          {response && (
            <p className="ml-3">
              {response}
            </p>
          )}
        </CardContent>
      </Card>
      </CardContent>
      <CardFooter className="flex-col gap-2">
            <form onSubmit={handleSubmit(onSubmit)}>
        <Field orientation={'horizontal'}>
          <ButtonGroup>
            <Input type="search" placeholder="type here..." {...register("name", {required: true})} />
            <Button type="submit" variant="default">
              submit
            </Button>
          </ButtonGroup>
        </Field>
      </form>
      </CardFooter>
    </Card>
    </div>
  )
}

export default App

