# Authentication

```shell
If this worked You will se me on the site!
Shell tab here

Using the qrl address...
Qoc8f9vd8d89fh89fh...

apt get update

```

```javascript
/* eslint no-console:0 */

function today(day) {
    const hour = parseInt(moment().utc().hour());
    if (hour < 19) {
        switch (day) {
        case 1:
            return "Monday";
        case 4:
            return "Thursday";
        }
    }
    if (hour < 20) {
        switch (day) {
        case 1:
            return "Team";
        case 4:
            return "Dev";
        }
    }
    switch (day) {
    case 1:
        return "Thursday";
    case 4:
        return "Monday";
    }
}
```

```python
import re
import sys
import urllib2
import BeautifulSoup

usage = "Run the script: ./geolocate.py IPAddress"

if len(sys.argv)!=2:
    print(usage)
    sys.exit(0)

if len(sys.argv) > 1:
    ipaddr = sys.argv[1]

geody = "http://www.geody.com/geoip.php?ip=" + ipaddr
html_page = urllib2.urlopen(geody).read()
soup = BeautifulSoup.BeautifulSoup(html_page)

# Filter paragraph containing geolocation info.
paragraph = soup('p')[3]

# Remove html tags using regex.
geo_txt = re.sub(r'<.*?>', '', str(paragraph))
print geo_txt[32:].strip()
```

```
This will show no matter which tab is shown

Using the qrl address...
Qoc8f9vd8d89fh89fh...
```

Something here about public private keys? Perhaps some details about how to interact with a wallet.

> Something else here as well.

This stuff is way cool, and easy to use. Get yours today!

| Table | Stuff | Here| 
|-------|-------|-----|
| something | here | Now |
| something | here | Now |
| something | here | Now |
| something | here | Now |
| something | here | Now |
| something | here | Now |
| something | here | Now |
