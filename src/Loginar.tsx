import Arweave from 'arweave';
import React from "react";
import { Button } from "@chakra-ui/button";
import { Input, HStack, Text, VStack, Menu, MenuButton, MenuList, MenuItem, Tooltip } from "@chakra-ui/react";
import { transactions } from 'near-api-js';

function Loginar(){ 
  const [address, setAddress] = React.useState<string>();
  const [recaddress,setRecAddress]=React.useState<string>();
  const [balance, setBalance] = React.useState<string>();
  const [img, setImg] = React.useState<Buffer>();
  const arweave = Arweave.init({});
  const [tagkey, setTagKey] = React.useState<string>("");
  const [tagval, setTagVal] = React.useState<string>("");
  const [wkey,setWkey] = React.useState<string>();

     const handlekey = () => {
        var fileInputEl = document.createElement("input");
        fileInputEl.type = "file";
        fileInputEl.accept = ".json";
        fileInputEl.style.display = "none";
        document.body.appendChild(fileInputEl);
        fileInputEl.addEventListener("input", function (e) {
          uploadKey(e as any);
          document.body.removeChild(fileInputEl);
        });
        fileInputEl.click();
      };
      
      function login(files, fileLoadCallback) {
        var reader = new FileReader();     
        reader.onload = fileLoadCallback;     
        reader.readAsText(files[0]);
      }
  
      const uploadKey = async (evt: React.ChangeEvent<HTMLInputElement>) => {
        let filelist = evt.target.files;
        if(filelist){
          login(filelist, function(evt) {
              const wallet = JSON.parse(evt.target.result);      
              setWkey(wallet);
              arweave.wallets.jwkToAddress(wallet).then((addr) => {
                  setAddress(addr);
                  arweave.wallets.getBalance(addr).then(balance => {
                    let winston = balance;
                    let ar = arweave.ar.winstonToAr(balance);
                    setBalance(winston);
              });
            });
          });
        }
      }; 

      const handleFileClick = () => {
        var fileInputEl = document.createElement("input");
        fileInputEl.type = "file";
        fileInputEl.accept = "image/*";
        fileInputEl.style.display = "none";
        document.body.appendChild(fileInputEl);
        fileInputEl.addEventListener("input", function (e) {
          handleUpload(e as any);
          document.body.removeChild(fileInputEl);
        });
        fileInputEl.click();
      };
    
      const handleUpload = async (evt: React.ChangeEvent<HTMLInputElement>) => {
        let files = evt.target.files;
        let reader = new FileReader();
        if (files && files.length > 0) {
          reader.onload = function () {
            if (reader.result) {
              setImg(Buffer.from(reader.result as ArrayBuffer));
            }
          };
          reader.readAsArrayBuffer(files[0]);
        }
      };
    
      const updateTagKey = (evt: React.BaseSyntheticEvent) => {
        setTagKey(evt.target.value);
      };
    
      const updateTagVal = (evt: React.BaseSyntheticEvent) => {
        setTagVal(evt.target.value);
      };

      const updateRecAddress = (evt: React.BaseSyntheticEvent) => {
        setRecAddress(evt.target.value);
      };

      const uploadFile = async () => {
        if (img) {
          var transaction;
          if(recaddress){
            transaction = await arweave.createTransaction
              ({ data: img,target :recaddress }, wkey);
          }
          else{
            transaction = await arweave.createTransaction
            ({ data: img}, wkey);
          }
          if(tagkey && tagval){
            transactions.addTag(tagkey,tagval);
          }
          await arweave.transactions.sign(transaction, wkey);
          const response = await arweave.transactions.post(transaction);
          console.log(response.status);
        }
      };
    

  return (
    <VStack spacing={35} >
      <HStack>
         <Button onClick={handlekey} colorScheme='teal' size='lg'>Login</Button>
      </HStack>
      {
        address &&(
          <>
            <HStack>
              <Text>Connected Account: {address ?? "None"}</Text>
            </HStack>
            <HStack>
              <Text>Balance :{balance} winston</Text>
            </HStack>
            <Button onClick={handleFileClick}>Select file from Device</Button>
            {
              img &&(
                <>
                  <HStack>
                    <Input 
                      placeholder="Key" 
                      value={tagkey}
                      onChange={updateTagKey}>
                    </Input>
                    <Input 
                      placeholder="Value" 
                      value={tagval}
                      onChange={updateTagVal}
                      >
                    </Input>                  
                  </HStack>
                  <HStack>
                    <Input placeholder='Receiver Address'
                        value={recaddress}
                        onChange={updateRecAddress}>
                    </Input>
                  </HStack>
                  <HStack>
                    <Button onClick={uploadFile}>Upload to Arweave</Button>
                  </HStack>
                </>
              )
            }  
          </>
        )
      }      
    </VStack >
  );
}

export default Loginar;