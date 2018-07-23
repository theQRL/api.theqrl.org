#!/bin/bash


var=($(curl  -XPOST http://127.0.0.1:5359/api/ListAddresses | jq -r '.addresses[] | @uri' )) 

varLength=${#var[@]}

for (( i=1; i<${varLength}+1; i++ )); 
	do 
		curl -XPOST http://127.0.0.1:5359/api/GetRecoverySeeds -d '
			{
				"address":"'"${var[$i-1]}"'"
			}' > ${var[$i-1]}_recoveryseed.txt 
	for filename in ./*.txt 
		do
			for ((i=0; i<=3; i++)); do
        	./MyProgram.exe "$filename" "Logs/$(basename "$filename" .txt)_Log$i.txt"
    		done
    	done

	done



