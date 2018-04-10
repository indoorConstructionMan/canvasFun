import re

class SetupServer(object):

    def __init__(self, port, ipaddress):
        self.file1 = './frontend/misc/constants.js'
        self.file2 = './server/server.js'
        self.files = [self.file1, self.file2]
        self.port = port
        self.ipaddress = ipaddress


    def setPortsAndIp(self):
        self.swapPorts()
        self.swapIp()

    def getFiles(self):
        return self.files


    def swapIp(self):
        self.swapIpOnFile(self.files[0])
        self.swapIpOnFile(self.files[0])



    def swapPorts(self):
        self.swapPortsOnFile(self.file1)
        self.swapPortsOnFile(self.file2)


    def swapIpOnFile(self, file):
        count = 0
        countPort = 0
        countIp = 0

        with open(file, 'r+') as f:
            for line in f:
                matchIpaddress = re.match(r"var IPADDRESS = '(\w+.\w+.\w+.\w+)';", line, re.M|re.I);
                if matchIpaddress:
                    countIp = count
                count += 1

        with open(file, 'r') as file:
            data = file.readlines()
            data[countIp] = 'var IPADDRESS = ' + "'" + self.ipaddress + "';\n"
            with open(self.file1, 'w') as file:
                file.writelines(data)






    def swapPortsOnFile(self, fileToLoad):
        count = 0
        countPort = 0
        countIp = 0

        with open(fileToLoad, 'r+') as f:
            for line in f:
                matchPort  = re.match(r"var PORT = (\w+);", line, re.M|re.I)
                if matchPort:
                    countPort = count
                count += 1

        with open(fileToLoad, 'r') as file:
            data = file.readlines()

            data[countPort] = 'var PORT = ' + str(self.port) + ';\n'

            with open(fileToLoad, 'w') as file:
                file.writelines(data)



if __name__=="__main__":
    s = SetupServer(3100, '192.168.0.12.234')
    #s.swapIp()
