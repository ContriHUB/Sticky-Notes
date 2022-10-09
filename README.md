# Sticky-Notes

A platform to save and share your Notes and todos

![Sticky Notes Login image](https://user-images.githubusercontent.com/65178804/194393264-0db002ce-f9ac-4493-bfbb-cd1ee2e7bd7c.PNG)
![Sticky Notes Homepage image](https://user-images.githubusercontent.com/65178804/194393405-1f2a470e-aa7f-41cf-bf34-528c339e0380.PNG)

## How to run locally

open the terminal/command prompt at the location where you want to setup the project.

use the following commands in the terminal or command prompt:

### Prerequisites
* Install MongoDb Compass
* Make a .env file inside Sticky_Notes Folder
* Add the following Key Values in the
    - MONGO_URI = mongodb://localhost:27017 if you have Mongodb Compass Installed and run the local instance inside mongodb compass as well
                    otherwise create a cluster in Mongodb Atlas and paste the mongo uri in the value field

    - JWT_SECRET = "Any_Secret_Key_of_Your_Choice"

```shell
git clone https://github.com/ContriHUB/Sticky-Notes.git

cd Sticky-Notes

npm i
```

once these command are completed successfully

do `npm run dev` to start the project

## Contributing

1. Fork this repo and clone it to your system.
2. Get the issue assigned to you on the ContriHUB website.
3. Make the required changes. Please keep your changes relevant only to the issue specified.
4. Add your name in the [CONTRIBUTORS.MD](CONTRIBUTORS.md) file
5. Create a PR with your changes and a detailed description of the changes you have made.
6. Submit the PR link on the ContriHUB website.

For major changes, please open an issue first to discuss what you would like to change.

## NOTE:

No external library is allowed for this project.
Try Not to add any extra Dependency to this Project

## Contributors

A list of contributors can be found in [CONTRIBUTORS.MD](CONTRIBUTORS.md)
